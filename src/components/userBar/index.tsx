import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import { firebase_app, logOut } from "../../firebase";
import { notifications, shoppingCart, expand, avatar } from "../../assets";

export default function userBar() {
  const router = useNavigate();
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  const [showUser, setShowUser] = useState("none");
  const [showUserHr, setShowUserHr] = useState("transparent");
  const [showAccount, setShowAccount] = useState("none");
  const [showAccountHr, setShowAccountHr] = useState("transparent");
  const [showNotifications, setShowNotifications] = useState("none");
  const [showNotificationsHr, setShowNotificationsHr] = useState("transparent");
  const [showShoppingCart, setShowShoppingCart] = useState("none");
  const [showShoppingCartHr, setShowShoppingCartHr] = useState("transparent");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Choose a username");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        grabUser();
      }
    });
  }, [user]);

  async function grabUser() {
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
          setName(data["name"]);
          setLastName(data["lastName"]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleSignout() {
    logOut();
    router(0);
    router("/");
  }

  function handleUser() {
    return (
      <div>
        {isLoggedIn === false ? (
          <div>
            <Link
              className="mx-2 my-1 text-blue hover:text-purple underline"
              to="/signin"
            >
              Sign In
            </Link>
            <span className="mr-2 my-1">or</span>
            <Link
              className="mr-2 my-1 text-blue hover:text-purple underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div
            onMouseOver={() => {
              setShowUser("flex");
              setShowUserHr("white");
            }}
            onMouseLeave={() => {
              setShowUser("none");
              setShowUserHr("transparent");
            }}
            className="my-1 flex flex-col border-t border-l border-r border-white hover:border-slate-400"
          >
            <div className="mx-2 my-1 cursor-pointer flex">
              Hello <span className="ml-1 font-bold">{name}</span>
              <img className="w-2.5 ml-1" src={expand} alt="expand.svg" />
            </div>
            <hr
              style={{
                borderColor: `${showUserHr}`,
                marginTop: ".5px",
                borderTopWidth: "1.1px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: 1,
              }}
            />
            <div
              className="py-2 px-3 flex-col fixed bg-white border border-slate-400"
              style={{
                display: `${showUser}`,
                marginLeft: "-1px",
                marginTop: "27.5px",
              }}
            >
              <div className="flex">
                <img
                  className="mx-2"
                  src={avatar}
                  alt="avatar.svg"
                  style={{ width: "60px" }}
                />
                <div className="mr-2 flex flex-col ">
                  <div className="mb-1">
                    {name} {lastName}
                  </div>
                  {userName === "Choose a username" ? (
                    <Link className="underline" to={"/account-settings"}>
                      Choose a username
                    </Link>
                  ) : (
                    <Link className="underline" to={`/seller/${userName}`}>
                      {userName}
                    </Link>
                  )}
                </div>
              </div>
              <div>
                <Link
                  className="my-2 mx-2 hover:underline inline-block"
                  to={"/account-settings"}
                >
                  Account Settings
                </Link>
              </div>
              <div>
                <button
                  onClick={handleSignout}
                  className="mb-2 mx-2 hover:underline text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex justify-between py-1 px-8 border-b border-slate-200"
      style={{ boxShadow: "0px 0px 4px grey" }}
    >
      <div className="flex items-center">
        {handleUser()}
        <Link className="mx-2 my-1 hover:underline" to="/help">
          Help & Contact
        </Link>
      </div>
      <div className="flex items-center">
        <Link className="mx-2 my-1 hover:underline" to={"/sell"}>
          Sell
        </Link>
        <Link className="mx-2 my-1 hover:underline" to={"/orders"}>
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
          <Link className="flex px-2 py-1" to={"/account"}>
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
              marginTop: "27.5px",
              marginLeft: "-51px",
            }}
          >
            <Link
              className="my-2 hover:underline inline-block"
              to={"/recently-viewed"}
            >
              Recently Viewed
            </Link>
            <Link
              className="my-2 hover:underline inline-block"
              to={"/local-sellers"}
            >
              Local sellers
            </Link>
            <Link
              className="my-2 hover:underline inline-block"
              to={"/sales-dashboard"}
            >
              Sales Dashboard
            </Link>
            <Link
              className="my-2 hover:underline inline-block"
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
            className="flex mx-2 my-1 hover:cursor-pointer"
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
              marginTop: "33px",
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
              className="mx-2 my-1"
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
              marginTop: "33px",
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
