import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

import { firebase_app } from "../../../firebase";

export default function ListingPage() {
  const url = window.location.href;
  const db = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);

  const [listing, setListing] = useState<any>([]);
  const [exists, setExists] = useState(true);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [sellerImage, setSellerImage] = useState("");
  const [sellerNumberOfReviews, setSellerNumberOfReviews] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function grabUser(location: string) {
    const docRef = doc(db, "Users", location);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setRating(docSnap.data().rating);
      setSellerImage(docSnap.data().profilePicture[0]);
      setSellerNumberOfReviews(docSnap.data().numberOfReviews);
      // setExists(true);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getListing() {
    const listingId = url.split("/listing/");
    console.log(listingId[1]);
    const docRef = doc(db, "listings", listingId[1]);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      grabUser(docSnap.data().createdByUserId);
      setListing(docSnap.data());
      setImages(docSnap.data().images);
      setExists(true);
      // console.log(listing);
      // console.log(listing.title);
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setExists(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    getListing();
  }, []);

  function handleImageForward() {
    if (selectedImage <= images.length - 2) {
      console.log("forward");
      setSelectedImage(selectedImage + 1);
    }
  }

  function handleImageBackward() {
    if (selectedImage >= 1 && images.length > 0) {
      console.log("backward");
      setSelectedImage(selectedImage - 1);
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("started");
    if (quantity > listing.quantity) {
      console.log("Quantity is greater than stock");
      setError("Quantity is greater than stock");
      return;
    } else {
      if (auth.currentUser) {
        const cart = {
          listingId: listing.listingId,
          quantity: quantity,
          title: listing.title,
          price: listing.price,
          priceType: listing.priceType,
          image: listing.images[0],
          shippingCost: listing.shippingCost,
          freeShipping: listing.freeShipping,
        };
        setDoc(
          doc(db, "Users", auth.currentUser.uid),
          { cart: arrayUnion(cart) },
          { merge: true }
        );
        console.log("added to cart");
      }
    }
  }

  function handleListing() {
    return (
      <div className="flex">
        <div className="flex w-723">
          <div className="flex flex-col space-y-1">
            {images.map((image: any, index: any) => {
              return (
                <div
                  className={`w-24 h-24 overflow-hidden bg-gray-200 grid place-items-center	hover:cursor-pointer ${
                    selectedImage === index ? "border-2 border-black" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setSelectedImage(index), console.log(selectedImage);
                  }}
                >
                  <img
                    className={`w-full h-auto py-auto`}
                    src={image}
                    alt={listing.title}
                  />
                </div>
              );
            })}
          </div>
          <div className="ml-5 w-620 h-465">
            <div className="flex relative bg-gray-200">
              <div
                className="absolute left-5 top-1/2 w-11	h-11 cursor-pointer my-auto z-10 bg-white border-0 rounded-full	drop-shadow-lg py-auto grid place-items-center"
                onClick={handleImageBackward}
              >
                <div className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                    />
                  </svg>
                </div>
              </div>
              <img
                className="w-full h-full z-0 object-cover"
                src={images[selectedImage]}
                alt={listing.title}
              />
              <div
                className="absolute right-5 top-1/2 w-11	h-11 cursor-pointer my-auto z-10 bg-white border-0 rounded-full	drop-shadow-lg grid place-items-center"
                onClick={handleImageForward}
              >
                <div className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-5 flex flex-col space-y-2">
          <h1 className="text-4xl font-semibold">{listing.title}</h1>
          <div className="flex border border-gray-300 w-fit py-2 px-3">
            <Link
              to={`/user/${listing.createdByUserName}`}
              className="grid place-items-center"
            >
              <img
                className="w-10 h-auto mr-2"
                src={sellerImage}
                alt="seller"
              />
            </Link>
            <div className="flex flex-col space-y-1">
              <div className="flex">
                <Link
                  className="underline"
                  to={`/user/${listing.createdByUserName}`}
                >
                  {listing.createdByUserName}
                </Link>
                <span className="text-gray-600">
                  - {sellerNumberOfReviews} reviews
                </span>
              </div>
              <div className="flex flex-col">
                <div className="">{rating}% positive</div>
                <Link
                  className="underline"
                  to={`/contact/'
                '/${listing.createdByUserName}`}
                >
                  Contact Seller
                </Link>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="text-3xl font-semibold">${listing.price}</div>
            <div className=" ml-1 my-auto">Per {listing.priceType}</div>
          </div>
          <div className="text-3xl font-semibold">
            {listing.quantity} {listing.priceType}s in stock
          </div>
          <div>
            {listing.freeShipping ? (
              <div>Free shipping</div>
            ) : (
              <div>Shipping: ${listing.shippingCost}</div>
            )}
            <div>Shipping from {listing.zipCode}</div>
          </div>
          <p className="text-lg italic text-gray-700">
            “{listing.description}”
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex space-y-2 flex-col">
              <div className="text-red-500">{error}</div>
              <div>
                <label className="mr-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  className="remove-arrow border border-gray-700 px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={listing.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="px-10 py-3 bg-3665f3 text-white ml-0"
              >
                Add to cart
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return (
    // console.log(listing.title),
    <div className="px-10 pt-2 mb-10 mt-5 flex">
      {loading ? (
        <div className="w-full text-center text-5xl">Loading...</div>
      ) : (
        <div className="w-full">
          {exists === false ? (
            <div className="w-full text-center text-5xl mt-5">
              The listing you are looking for doesn't exist
            </div>
          ) : (
            handleListing()
          )}
        </div>
      )}
    </div>
  );
}
