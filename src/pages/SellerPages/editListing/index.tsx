import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

import { uploadImages, firebase_app } from "../../../firebase";

import "./editListing.scss";

export default function editListing() {
  const url = window.location.href;
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState("");
  const [listingId, setListingId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<any>();
  const [priceType, setPriceType] = useState("");
  const [quantity, setQuantity] = useState<any>();
  const [newImages, setNewImages] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [shippingError, setShippingError] = useState("");
  const [shippingCost, setShippingCost] = useState<any>(null);
  const [freeShipping, setFreeShipping] = useState(false);
  const [zipCode, setZipCode] = useState<any>();
  const [uploadComplete, setUploadComplete] = useState(false);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSelectedDiv("");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getListing();
      }
    });
  }, [url]);

  async function getListing() {
    setLoading(true);
    const listingId = url.split("/seller/edit-listing/");
    // console.log(listingId[1]);
    const docRef = doc(db, "listings", listingId[1]);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data());
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      if (user?.uid === docSnap.data().createdByUserId) {
        setAuthorized(true);
        setLoading(false);
        setListingId(docSnap.data().listingId);
        setTitle(docSnap.data().title);
        setCategory(docSnap.data().category.split("+")[0]);
        setDescription(docSnap.data().description);
        setPrice(docSnap.data().price);
        setPriceType(docSnap.data().priceType);
        setQuantity(docSnap.data().quantity);
        setImages(docSnap.data().images);
        setShippingCost(docSnap.data().shippingCost);
        setFreeShipping(docSnap.data().freeShipping);
        setZipCode(docSnap.data().zipCode);
      } else {
        setAuthorized(false);
        setLoading(false);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      //    setExists(false);
      //    setLoading(false);
    }
  }

  function handleStringLength(string: String, limit: number) {
    return string.substring(0, limit);
  }

  function handleImages(e: any) {
    if (e.target.files) {
      let imagesArr = Array.from(e.target.files);
      setNewImages(imagesArr);
    }
  }

  function handleUpload() {
    setUploadComplete(false);
    const id = listingId;
    let listing: any = {
      listingId: id,
      title: title,
      category: category + "+all",
      description: description,
      images: [] as string[],
      price: price,
      priceType: priceType,
      quantity: quantity,
      shippingCost: shippingCost,
      freeShipping: freeShipping,
      zipCode: Number(zipCode),
      // sold: false,
      // soldTo: "",
      // soldToId: "",
      // soldDate: "",
    };

    uploadImages(newImages, "listings", id).then((urls) => {
      let allImages = images;
      for (let i = 0; i < urls.length; i++) {
        allImages.push(urls[i]);
      }
      listing["images"] = allImages;
      // setListing({ ...listing, images: urls });
      // databaseAddData(`listings/${id}`, listing).then((res) => {
      //   console.log(res);
      // });
      setDoc(doc(db, "listings", id), listing, { merge: true });
      //   addData("listings", id, listing);
      //   .then(() => {
      //     if (auth.currentUser) {
      //       setDoc(
      //         doc(db, "Users", auth.currentUser.uid),
      //         {
      //           listings: arrayUnion(id),
      //         },
      //         { merge: true }
      //       );
      //     }
      //   });

      console.log(listing);
      setUploadComplete(true);
      // setMessage("Your listing has been created!");
      // useNavigate(0)
      // router(0)
    });
  }

  function handleCreateListing(e: any) {
    e.preventDefault();
    if (shippingCost !== 0 || freeShipping !== false) {
      setShippingError("");
      handleUpload();
    } else {
      setShippingError("Please enter a shipping cost or select free shipping.");
      return;
    }
  }

  function handleDeleteImage(index: number, array: any[]) {
    let newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  }

  function handleEditImages() {
    return (
      <div>
        <div className="border-b pb-4 border-gray-300 mt-5">
          <div className="text-2xl text-gray-700">Images</div>
          {images.length === 0 ? (
            <div />
          ) : (
            <div className="mt-3">
              <div className="text-xl text-gray-700">Current Images</div>
              <div className="grid grid-cols-3 gap-y-4 justify-items-center py-5 mb-5 mt-2 border border-dashed border-gray-700 rounded-lg">
                {images.map((image, index) => {
                  return (
                    <div className="mx-4" key={index}>
                      <img
                        src={image}
                        alt="listing"
                        className="h-64 object-cover"
                      />
                      <div className="text-sm text-gray-600">
                        Image {index + 1}
                      </div>
                      <button
                        type="button"
                        className="text-sm text-red"
                        onClick={() => {
                          //   console.log("click");
                          setImages(handleDeleteImage(index, images));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {newImages.length === 0 ? (
            <div />
          ) : (
            <div className="mt-3">
              <div className="text-xl text-gray-700">New Images</div>
              <div className="grid grid-cols-3 gap-y-4 justify-items-center py-5 mb-5 mt-2 border border-dashed border-gray-700 rounded-lg">
                {newImages.map((image, index) => {
                  return (
                    <div className="mx-4" key={index}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="listing"
                        className="h-64 object-cover"
                      />
                      <div className="text-sm text-gray-600">
                        Image {index + 1}
                      </div>
                      <button
                        type="button"
                        className="text-sm text-red"
                        onClick={() => {
                          //   console.log("click");
                          setNewImages(handleDeleteImage(index, newImages));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <input
            className="border border-gray-700 w-full px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none hover:cursor-pointer "
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImages(e);
            }}
            multiple
            required
          />
        </div>
      </div>
    );
  }

  function handleEditListing() {
    return (
      <div>
        <h1 className="text-3xl font-semibold text-gray-700	">
          Edit your listing
        </h1>
        <div>
          <form onSubmit={handleCreateListing}>
            <div className="border-b pb-2 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Title</div>
              <input
                className="border border-gray-700 w-full px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                type="text"
                placeholder="Title:"
                onChange={(e) =>
                  setTitle(handleStringLength(e.target.value, 100))
                }
                value={title}
                required
              />
              <div className="mt-1 text-sm text-right text-gray-600 font-semibold">
                {title.length}/100
              </div>
            </div>
            <div className="border-b pb-5 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Category</div>
              <select
                className="border text-small border-gray-700 w-1/3 px-2 py-1 mt-2 bg-gray-100 text-gray-900 focus:outline-none hover:cursor-pointer"
                name="Category"
                id="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Fruit">Fruits</option>
                <option value="Vegetable">Vegetables</option>
                <option value="Mushroom">Mushrooms</option>
                <option value="Herb">Herbs</option>
                <option value="Nuts">Nuts</option>
                <option value="Grains">Grains</option>
                <option value="Meat">Meat</option>
                <option value="Cheese">Cheese</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {handleEditImages()}
            <div className="border-b pb-2 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Description</div>
              <textarea
                className="resize-none border border-gray-700 w-full px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                name="Description"
                id="Description"
                cols={30}
                rows={10}
                placeholder="Description:"
                value={description}
                onChange={(e) =>
                  setDescription(handleStringLength(e.target.value, 1000))
                }
                required
              />
              <div className="mt-1 text-sm text-right text-gray-600 font-semibold">
                {description.length}/1000
              </div>
            </div>
            <div className="border-b pb-4 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Price</div>
              <div className="flex flex-row">
                <div
                  ref={wrapperRef}
                  className={`border flex border-gray-700 w-1/4 px-4 mt-2 bg-gray-100
              ${selectedDiv === "priceDiv" ? " selected" : undefined}`}
                  onClick={() => setSelectedDiv("priceDiv")}
                >
                  <div className="mr-1 py-2.5 text-gray-600">$</div>
                  <input
                    className="remove-arrow py-2.5 w-full bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:none"
                    type="number"
                    //   placeholder="Price:"
                    value={price}
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                    // onWheel={(e) => e.currentTarget.blur()}
                    // onKeyDown={}
                    min={0}
                    step=".01"
                    required
                  />
                </div>
                <select
                  className="border text-small border-gray-700 w-1/4 px-2 py-1 mt-2 ml-4 bg-gray-100 text-gray-900 focus:outline-none hover:cursor-pointer"
                  name="PriceType"
                  id="PriceType"
                  value={priceType}
                  onChange={(e) => setPriceType(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="unit">Per unit</option>
                  <option value="dozen">Per dozen</option>
                  <option value="lb">Per lb</option>
                  <option value="oz">Per oz</option>
                  <option value="g">Per g</option>
                  <option value="kg">Per kg</option>
                </select>
              </div>
            </div>
            <div className="border-b pb-4 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Quantity</div>
              <input
                className="remove-arrow border border-gray-700 w-1/4 px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                type="number"
                // pattern="[0-9]*"
                // placeholder="Quantity:"
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
                min={0}
                value={quantity}
                required
              />
            </div>
            <div className="border-b pb-4 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Shipping</div>
              <div className="text-sm text-red">{shippingError}</div>
              <div className="flex flex-row">
                <div
                  ref={wrapperRef}
                  className={`border flex border-gray-700 w-1/4 px-4 mt-2 bg-gray-100
              ${selectedDiv === "shippingDiv" ? " selected" : undefined}`}
                  onClick={() => setSelectedDiv("shippingDiv")}
                >
                  <div className="mr-1 py-2.5 text-gray-600">$</div>
                  <input
                    className="remove-arrow py-2.5 w-full bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:none"
                    type="number"
                    onChange={(e) => {
                      setShippingCost(Number(e.target.value));
                    }}
                    min={0}
                    step=".01"
                    value={shippingCost}
                  />
                </div>
                <div className="ml-4">
                  <input
                    type="checkbox"
                    className="border border-gray-700 w-1/4 py-2.5 mt-2 bg-gray-100 text-gray-900 focus:outline-none"
                    onChange={(e) => setFreeShipping(e.target.checked)}
                    // value={Boolean(freeShipping)}
                  />
                  <div className="text-sm text-gray-600">Free shipping</div>
                </div>
              </div>
            </div>
            <div className="border-b pb-4 border-gray-300 mt-5">
              <div className="text-2xl text-gray-700">Zip code</div>
              <input
                className="remove-arrow border border-gray-700 w-1/4 px-4 py-2.5 mt-2 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                type="number"
                // pattern="[0-9]*"
                placeholder="Enter your Zip code:"
                onChange={(e) =>
                  setZipCode(handleStringLength(e.target.value, 5))
                }
                min={0}
                value={zipCode}
                required
              />
            </div>
            {uploadComplete ? (
              <div className="flex mt-4">
                <div className="text-2xl text-gray-700">
                  Your listing has been successfully been updated! Click{" "}
                  <span>
                    <Link className="text-blue" to={`/listing/${listingId}`}>
                      here
                    </Link>
                  </span>{" "}
                  to view your page.
                </div>
              </div>
            ) : (
              <div />
            )}
            <div className="mt-5">
              <button
                type="submit"
                className="px-10 py-2 rounded-md border border-3665f3 bg-3665f3 text-white hover:bg-white hover:text-3665f3"
              >
                Update listing
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-10 my-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {authorized ? (
            handleEditListing()
          ) : (
            <div className="w-full text-center text-5xl mt-5">You are not authorized to edit this page</div>
          )}
        </div>
      )}
    </div>
  );
}
