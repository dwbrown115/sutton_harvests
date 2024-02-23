import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { SalesDashNav } from "../../../components";
import { firebase_app, getData } from "../../../firebase";

export default function sellerListings() {
  const auth = getAuth(firebase_app);

  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const grabListings = useCallback(() => {
    setIsLoading(true);
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
            }
          }
        }
      }
    });
    setIsLoading(false);
  }, []);

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
                    <h1 className="text-xl font-semibold">{listing.title}</h1>
                    <p className="text-gray-500">${listing.price}</p>
                    <p className="text-gray-500">{listing.quantity} in stock</p>
                  </div>
                  <Link
                    className="h-1/2 my-auto px-5 py-2 rounded-md	border border-3665f3 bg-3665f3 text-white hover:bg-gray-100 hover:text-3665f3"
                    to={`/sales/edit-listing/${listing.listingId}`}
                  >
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
