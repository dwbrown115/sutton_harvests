import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  setDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

import { uploadImages, firebase_app, addData } from "../../../firebase";
import { makeId } from "../../../helpers";

import "./createListing.scss";

export default function createListing() {
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const [selectedDiv, setSelectedDiv] = useState("");
  const [listingId, setListingId] = useState("");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<any>();
  const [priceType, setPriceType] = useState("");
  const [quantity, setQuantity] = useState<any>();
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
        grabUser();
      }
    });
  }, [user]);

  async function grabUser() {
    const user = auth.currentUser;
    if (user) {
      const collection = "Users";
      const id = auth.currentUser.uid;
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      try {
        const data = docSnap.data();
        if (data) {
          if (data["userName"]) {
            setUserName(data["userName"]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleStringLength(string: String, limit: number) {
    return string.substring(0, limit);
  }

  function handleImages(e: any) {
    if (e.target.files) {
      let imagesArr = Array.from(e.target.files);
      setImages(imagesArr);
    }
  }

  function handleUpload() {
    setUploadComplete(false);
    const time = Date().toLocaleString();
    const id = makeId(16);
    setListingId(id);
    let listing: any = {
      listingId: id,
      createdByUserName: userName,
      createdByUserId: auth.currentUser?.uid,
      created: time,
      title: title,
      category: category,
      description: description,
      images: [] as string[],
      price: price,
      priceType: priceType,
      quantity: quantity,
      shippingCost: shippingCost,
      freeShipping: freeShipping,
      zipCode: Number(zipCode),
    };

    uploadImages(images, "listings", title).then((urls) => {
      listing["images"] = urls;
      // setListing({ ...listing, images: urls });
      // databaseAddData(`listings/${id}`, listing).then((res) => {
      //   console.log(res);
      // });
      addData("listings", id, listing).then(() => {
        if (auth.currentUser) {
          setDoc(
            doc(db, "Users", auth.currentUser.uid),
            {
              listings: arrayUnion(id),
            },
            { merge: true }
          );
        }
      });

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

  return (
    <div className="mx-10 my-5">
      <h1 className="text-3xl font-semibold text-gray-700	">
        Create your listing
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
              <option value="none">Select</option>
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
          <div className="border-b pb-4 border-gray-300 mt-5">
            <div className="text-2xl text-gray-700">Images</div>
            {images.length === 0 ? (
              <div />
            ) : (
              <div className="grid grid-cols-3 gap-y-4 justify-items-center py-5 my-5 border border-dashed border-gray-700 rounded-lg	">
                {images.map((image, index) => {
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
                    </div>
                  );
                })}
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
                  // placeholder="Price:"
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
                <option value="none">Select</option>
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
                  // value={shippingCost}
                />
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  className="border border-gray-700 w-1/4 py-2.5 mt-2 bg-gray-100 text-gray-900 focus:outline-none"
                  onChange={(e) => setFreeShipping(e.target.checked)}
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
                Your listing has been successfully created! Click{" "}
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
              Create listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
