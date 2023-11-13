import { useState } from "react";
import { Link } from "react-router-dom";

import { notifications, shoppingCart, expand } from "../../assets";

export default function userBar() {
  const [showAccount, setShowAccount] = useState("none");
  const [showAccountHr, setShowAccountHr] = useState("transparent");
  const [showNotifications, setShowNotifications] = useState("none");
  const [showNotificationsHr, setShowNotificationsHr] = useState("transparent");
  const [showShoppingCart, setShowShoppingCart] = useState("none");
  const [showShoppingCartHr, setShowShoppingCartHr] = useState("transparent");

  return (
    <div
      className="flex justify-between py-1 px-8 border-b border-slate-200"
      style={{ boxShadow: "0px 0px 4px grey" }}
    >
      <div className="flex items-center">
        <Link
          className="mx-2 my-1 text-blue hover:text-purple  border-b border-blue hover:border-purple"
          to="/signin"
        >
          Sign In
        </Link>
        <span className="mr-2 my-1">or</span>
        <Link
          className="mr-2 my-1 text-blue hover:text-purple border-b border-blue hover:border-purple"
          to="/signup"
        >
          Sign Up
        </Link>
        <Link
          className="mr-2 my-1 border-b border-white hover:border-black"
          to="/help"
        >
          Help & Contact
        </Link>
      </div>
      <div className="flex items-center">
        <Link
          className="mx-2 my-1 border-b border-white hover:border-black"
          to={"/sell"}
        >
          Sell
        </Link>
        <Link
          className="mx-2 my-1 border-b border-white hover:border-black"
          to={"/orders"}
        >
          My Orders
        </Link>
        <div
          onMouseOver={() => {
            setShowAccount("flex");
            setShowAccountHr("white");
          }}
          onMouseLeave={() => {
            setShowAccount("none");
            setShowAccountHr("transparent");
          }}
          className="flex my-1 flex-col border-t border-l border-r border-white hover:border-slate-400"
        >
          <Link className="flex px-2" to={"/account"}>
            My account
            <img className="w-2.5 ml-1" src={expand} alt="expand.svg" />
          </Link>
          <hr
            style={{
              borderColor: `${showAccountHr}`,
              marginTop: ".5px",
              borderTopWidth: "1.1px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              zIndex: 1,
            }}
          />
          <div
            className="py-2 flex-col fixed pl-5 bg-white pr-5 border border-slate-400"
            style={{
              display: `${showAccount}`,
              marginTop: "19.5px",
              marginLeft: "-51px",
            }}
          >
            <Link
              className="my-2 border-b border-white hover:border-black inline-block"
              to={"/account-settings"}
            >
              Account Settings
            </Link>
            <Link
              className="my-2 border-b border-white hover:border-black inline-block"
              to={"/recently-viewed"}
            >
              Recently Viewed
            </Link>
            <Link
              className="my-2 border-b border-white hover:border-black inline-block"
              to={"/local-sellers"}
            >
              Local sellers
            </Link>
            <Link
              className="my-2 border-b border-white hover:border-black inline-block"
              to={"/sales-dashboard"}
            >
              Sales Dashboard
            </Link>
            <Link
              className="my-2 border-b border-white hover:border-black inline-block"
              to={"/purchase-history"}
            >
              Purchase History
            </Link>
          </div>
        </div>

        <div
          className="flex my-1 flex-col border-t border-l border-r border-white hover:border-slate-400"
          onMouseOver={() => {
            setShowNotifications("flex");
            setShowNotificationsHr("white");
          }}
          onMouseLeave={() => {
            setShowNotifications("none");
            setShowNotificationsHr("transparent");
          }}
        >
          <img
            className="flex mx-2 hover:cursor-pointer"
            src={notifications}
            alt="notifications.svg"
            style={{ height: "25px" }}
          />
          <hr
            style={{
              borderColor: `${showNotificationsHr}`,
              marginTop: ".5px",
              borderTopWidth: "1.1px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              zIndex: 1,
            }}
          />
          <div
            className="px-20 py-24 flex-col fixed bg-white border border-slate-400"
            style={{
              display: `${showNotifications}`,
              marginLeft: "-371px",
              marginTop: "25px",
            }}
          >
            <div
              className="text-center w-4/6"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Please{" "}
              <span>
                <Link
                  className="mr-1 my-1 text-blue hover:text-purple  border-b border-blue hover:border-purple"
                  to={"/signin"}
                >
                  sign in
                </Link>
              </span>{" "}
              to view notifications
            </div>
          </div>
        </div>
        <div
          className="flex my-1 flex-col border-t border-l border-r border-white hover:border-slate-400"
          onMouseOver={() => {
            setShowShoppingCart("flex");
            setShowShoppingCartHr("white");
          }}
          onMouseLeave={() => {
            setShowShoppingCart("none");
            setShowShoppingCartHr("transparent");
          }}
        >
          <Link className="flex  hover:cursor-pointer" to={"/cart"}>
            <img
              className="mx-2"
              src={shoppingCart}
              alt="shoppingCart.svg"
              style={{ width: "25px" }}
            />
          </Link>
          <hr
            style={{
              borderColor: `${showShoppingCartHr}`,
              marginTop: ".5px",
              borderTopWidth: "1.1px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              zIndex: 1,
            }}
          />
          <div
            className="pr-10 pt-5 flex-col fixed bg-white border border-slate-400"
            style={{
              display: `${showShoppingCart}`,
              marginLeft: "-244.5px",
              marginTop: "25px",
            }}
          >
            <div className="pl-5 pb-5 w-2/3">
              Nothing is currently in your cart.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// border-white hover:
