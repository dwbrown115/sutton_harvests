import { useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import firebase_app from "../../../firebase/config";

function ForgotPassword() {
  const auth = getAuth(firebase_app);
  const router = useNavigate();

  const [email, setEmail] = useState("");

  async function handlePasswordEmailForm(e: any) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Email sent");
      setEmail("");
      router("/signin");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="my-5">
      <h1 className="text-center text-2xl mb-1">Reset password with email:</h1>
      <br />
      <form
        className="w-1/3 mx-auto flex flex-col"
        onSubmit={handlePasswordEmailForm}
      >
        <input
          className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="knownEmail"
          placeholder="Known email:"
        />
        <button
          className="w-full transition text-white border border-slate-400 hover:border-slate-800 bg-slate-400 hover:bg-slate-800 rounded-lg px-5 py-2 mx-auto"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
