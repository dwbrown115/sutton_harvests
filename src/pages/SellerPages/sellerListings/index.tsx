import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { SalesDashNav } from "../../../components";
import { firebase_app, getData, deleteData, addData } from "../../../firebase";

export default function sellerListings() {
  const auth = getAuth(firebase_app);

  const [listings, setListings] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<any[]>([]);

  const grabListings = useCallback(() => {
    // setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      setListings([]);
      // console.log(user?.uid);
      // console.log("Grabbing listings");
      if (user) {
        // console.log("User is logged in");
        const data = await getData("Users", user.uid);
        if (data) {
          if (data["listings"]) {
            for (let i = 0; i < data["listings"].length; i++) {
              const listing = await getData("listings", data["listings"][i]);
              setListings((prev: any[]) => [...prev, listing]);
              setConfirmDelete((prev: any) => [...prev, false]);
            }
          }
        }
      }
    });
    // setIsLoading(false);
  }, []);

  const deleteListing = async (listingId: string, index: number) => {
    // deleteData("listings", listingId);
    const user = auth.currentUser;
    if (user) {
      const data = await getData("Users", user.uid);
      if (data) {
        console.log(data["listings"]);
        let array = data["listings"];
        let listingArray = [...listings];
        // array.splice(l)
        array = array.filter((item: string) => item !== listingId);
        // console.log(array);
        listingArray.splice(index, 1);
        setListings(listingArray);
        const updatedData = { listings: array };
        addData("Users", user.uid, updatedData);
        deleteData("listings", listingId);
      }
    }
    // listings.splice(arrayIndex, 1);
  };

  function changeToTrue(index: number) {
    const newArray = [...confirmDelete];
    newArray[index] = true;
    setConfirmDelete(newArray);
  }

  function changeToFalse(index: number) {
    const newArray = [...confirmDelete];
    newArray[index] = false;
    setConfirmDelete(newArray);
  }

  // useEffect(() => {
  //   console.log(listings);
  // }, [listings]);

  // window.onload = grabListings;
  useEffect(() => {
    setListings([]);
  }, []);

  useEffect(() => {
    grabListings();
  }, [grabListings]);

  return (
    <div>
      <div className="mx-10">
        <SalesDashNav />
        <div className="flex flex-col mb-10">
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold text-gray-700		">
              Manage listings
            </h1>
            <Link
              className="px-5 py-2 rounded-md	border border-3665f3 bg-3665f3 text-white hover:bg-white hover:text-3665f3"
              to={"/seller/create-listing"}
            >
              Create new listing
            </Link>
          </div>
          <div className="flex flex-col mt-5">
            {listings.map((listing, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between p-5 my-1 border border-gray-100 rounded-md bg-gray-100"
                >
                  <div className="flex flex-col">
                    <Link
                      to={`/listing/${listing.listingId}`}
                      className="text-xl font-semibold hover:text-3665f3"
                    >
                      {listing.title}
                    </Link>
                    <p className="text-gray-500">${listing.price}</p>
                    <p className="text-gray-500">
                      {listing.quantity} {listing.priceType} in stock
                    </p>
                  </div>
                  <div className="my-auto flex">
                    <Link
                      className="h-1/2 px-5 py-2 rounded-md	border border-3665f3 bg-3665f3 text-white hover:bg-gray-100 hover:text-3665f3"
                      to={`/seller/edit-listing/${listing.listingId}`}
                    >
                      Edit
                    </Link>
                    {confirmDelete[index] ? (
                      <div className="flex h-full">
                        <button
                          className="h-1/2 px-5 py-2 ml-1 rounded-md	border border-3665f3 hover:bg-3665f3 hover:text-white bg-gray-100 text-3665f3"
                          onClick={() =>
                            deleteListing(listing.listingId, index)
                          }
                        >
                          Confirm delete
                        </button>
                        <button
                          className="h-1/2 px-5 py-2 ml-1 rounded-md	border border-3665f3 bg-3665f3 text-white hover:bg-gray-100 hover:text-3665f3"
                          // onClick={() => setConfirmDelete(false)}
                          onClick={() => {
                            changeToFalse(index);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="h-1/2 px-5 py-2 ml-1 rounded-md	border border-3665f3 hover:bg-3665f3 hover:text-white bg-gray-100 text-3665f3"
                        // onClick={() => setConfirmDelete(true)}
                        onClick={() => {
                          changeToTrue(index);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
