import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

import firebase_app from "../../firebase/config";
import { addData } from "../../firebase";

export default function signup() {
  const auth = getAuth(firebase_app);
  const navigate = useNavigate();

  const [focus1, setFocus1] = useState(true);
  const [focus2, setFocus2] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const personal = {
    background: focus1 ? "#000" : "#fff",
    color: focus1 ? "#fff" : "#000",
    borderColor: focus1 ? "#000" : "#fff",
  };

  const business = {
    background: focus2 ? "#000" : "#fff",
    color: focus2 ? "#fff" : "#000",
    borderColor: focus2 ? "#000" : "#fff",
  };

  useEffect(() => {
    if (accountType === "personal") {
      setFocus1(true);
      setFocus2(false);
    } else if (accountType === "business") {
      setFocus1(false);
      setFocus2(true);
    }
  }, [accountType]);

  return (
    <div className="px-10 py-2">
      <div className="flex border rounded-3xl border-black justify-between p-1 w-2/5 mx-auto">
        <button
          onClick={() => setAccountType("personal")}
          className="border rounded-3xl px-20 py-3"
          style={personal}
        >
          Personal
        </button>
        <button
          onClick={() => setAccountType("business")}
          className="border rounded-3xl px-20 py-3"
          style={business}
        >
          Business
        </button>
      </div>
    </div>
  );
}
