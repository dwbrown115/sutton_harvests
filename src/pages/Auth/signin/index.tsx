import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { signIn } from "../../firebase";

import { signIn } from "../../../firebase/";

function SignIn() {
  const router = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleForm(e: any) {
    e.preventDefault();
    try {
      await signIn(email, password);
      router("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="my-5">
      <h1 className="text-center text-4xl mb-1">Hello</h1>
      <h2 className="text-center text-lg">
        Sign in or{" "}
        <Link className=" text-blue hover:text-purple underline" to={"/signup"}>
          create an account
        </Link>
      </h2>
      <br />
      <form className={"w-1/3 mx-auto"} onSubmit={handleForm}>
        <input
          className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
          type="email"
          name="email"
          id="email"
          placeholder="Email:"
        />
        <input
          className="border border-slate-800 bg-slate-50 focus:outline-none rounded-lg px-5 py-2 w-full mb-2"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
          type="password"
          name="password"
          id="password"
          placeholder="Password:"
        />
        <button
          type="submit"
          className="w-full transition text-white border border-slate-400 hover:border-slate-800 bg-slate-400 hover:bg-slate-800 rounded-lg px-5 py-2 mx-auto"
        >
          Sign in
        </button>
      </form>
      <br />
      <div className="flex justify-center">
        <Link
          className="text-black hover:text-purple hover:underline"
          to={"/forgot-password"}
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
