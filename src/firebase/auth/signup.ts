import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

import addData from "../firestore/addData";
import firebase_app from "../config";

export default async function signUp(
  email: string,
  password: string,
  name: string,
  state: string,
  type: string
) {
  const auth = getAuth(firebase_app);
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser);
          try {
            const collection = `Users/AccountType/${type}`;
            const id = auth.currentUser.uid;
            const time = Date().toLocaleString();
            const data = {
              email,
              name,
              state,
              accountCreated: time,
            };
            await addData(collection, id, data);
            // navigate("/user/authentication");
          } catch (e) {
            console.log(e, "after signup");
          }
        }
      }
    );
  } catch (e) {
    console.log(e, "signup error");
  }
}
