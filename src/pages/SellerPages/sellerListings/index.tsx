import { Link } from "react-router-dom";

import { SalesDashNav } from "../../../components";

export default function sellerListings() {
  return (
    <div>
      <div className="mx-10">
        <SalesDashNav />
        <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  );
}
