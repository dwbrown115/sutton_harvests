import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { NavLink, Link } from "react-router-dom";

import { firebase_app } from "../../firebase";

export default function accountBar() {
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  const [userName, setUserName] = useState("");

  const style = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "mx-2 py-2 border-b-2 border-black"
      : "mx-2 py-2 border-b-2 border-transparent hover:border-black";

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="my-2 mx-8">
      <div className="flex flex-row justify-between">
        <div>
          <NavLink className={style} to="/activity">
            Activity
          </NavLink>
          <NavLink className={style} to="/messages">
            Messages
          </NavLink>
          <NavLink className={style} to="/account">
            Account
          </NavLink>
        </div>
        <div className="mx-2 flex">
          <div className="mr-1">Your page:</div>
          <Link
            className="underline text-blue hover:text-purple"
            to={`/user/${userName.replaceAll(" ", "_")}`}
          >
            {userName}
          </Link>
        </div>
      </div>
      <hr className="mx-2 border-1" style={{ marginTop: "8.8px" }} />
    </div>
  );
}
