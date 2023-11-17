import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../../firebase";

export default function signup() {
  // const auth = getAuth(firebase_app);
  const navigate = useNavigate();

  const [focus1, setFocus1] = useState(true);
  const [focus2, setFocus2] = useState(false);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [state, setState] = useState("");
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
      setBusinessName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setState("");
    } else if (accountType === "business") {
      setFocus1(false);
      setFocus2(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setState("");
    }
  }, [accountType]);

  function handleSignUp(e: any) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      if (accountType === "personal") {
        const name = firstName;
        const time = Date().toLocaleString();
        const data = {
          email,
          name,
          lastName,
          state,
          accountCreated: time,
          accountType: "personal",
        };
        signUp(email, password, data);
        navigate("/");
      } else if (accountType === "business") {
        const time = Date().toLocaleString();
        const name = businessName;
        const data = {
          email,
          name,
          state,
          accountCreated: time,
          accountType: "business",
        };
        signUp(email, password, data);
        navigate("/");
      }
    }
  }

  function handleStates() {
    return (
      <select
        className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
        onChange={(e) => {
          setState(e.target.value);
        }}
        value={state}
      >
        <option value="">State:</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    );
  }

  function handlePersonal() {
    return (
      <div>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="First name:"
              className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5 mr-5"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <input
              type="text"
              placeholder="Last name:"
              className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            type="password"
            placeholder="Confirm password:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          {handleStates()}
          <button className="transition text-white border border-slate-400 hover:border-slate-800 bg-slate-400 hover:bg-slate-800 rounded-lg px-5 py-2 w-1/2 mb-5 mx-auto">
            Create Account
          </button>
        </form>
      </div>
    );
  }

  function handleBusiness() {
    return (
      <div>
        <form onSubmit={handleSignUp} className="flex flex-col">
          <input
            type="text"
            placeholder="Business name:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setBusinessName(e.target.value)}
            value={businessName}
            required
          />
          <input
            type="email"
            placeholder="Email:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            type="password"
            placeholder="Confirm password:"
            className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-5"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          {handleStates()}
          <button className="transition text-white border border-slate-400 hover:border-slate-800 bg-slate-400 hover:bg-slate-800 rounded-lg px-5 py-2 w-1/2 mb-5 mx-auto">
            Create Account
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-10">
      <div className="flex justify-end py-4">
        <div>Already have an account?</div>
        <Link
          className="mx-2 text-blue hover:text-purple  border-b border-blue hover:border-purple"
          to="/signin"
        >
          Sign in
        </Link>
      </div>
      <div className="mb-4 mt-2">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
      </div>
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
      <div className="mx-auto mt-5 flex justify-center flex-col w-2/5 text-center	">
        {accountType === "personal" ? (
          <div>{handlePersonal()}</div>
        ) : (
          <div>{handleBusiness()}</div>
        )}
      </div>
    </div>
  );
}
