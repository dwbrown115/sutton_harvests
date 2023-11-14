import { useState, useEffect } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";

import { firebase_app } from "../../firebase";

export default function verifyEmailBar() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified === false) {
          setIsEmailVerified(true);
        }
      }
    });
  }, [user]);

  async function handleSendEmailVerification() {
    try {
      if (user) {
        await sendEmailVerification(auth.currentUser);
        setIsEmailSent("Email sent!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      {isEmailVerified === false ? (
        <div />
      ) : (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p className="font-bold">Please verify your email address</p>
          <p>
            We have sent you an email that contains a link - you must click this
            link to verify your email address.
          </p>
          <p>
            If you have not received an email, please check your spam folder, or{" "}
            <button
              className="text-blue-500 underline"
              onClick={() => {
                handleSendEmailVerification();
              }}
            >
              click here to resend
            </button>
            .
          </p>
          <p>{isEmailSent}</p>
        </div>
      )}
    </div>
  );
}
