import { Routes, Route } from "react-router-dom";

import {
  accountActivity,
  accountMessages,
  accountSettings,
} from "./pages/Account";
import { forgotPassword, signin, signup } from "./pages/Auth";
import { sell, user } from "./pages/SellerPages";
import { home, search } from "./pages";
import { UserBar, SearchBar, VerifyEmailBar } from "./components";

import "./App.scss";

function App() {
  return (
    <div className="">
      <UserBar />
      <SearchBar />
      <VerifyEmailBar />
      <Routes>
        <Route path="/" element={home()} />
        {/*Account pages*/}
        <Route path="/account/activity" element={accountActivity()} />
        <Route path="/account/messages" element={accountMessages()} />
        <Route path="/account/settings" element={accountSettings()} />
        {/*Auth pages*/}
        <Route path="/forgot-password" element={forgotPassword()} />
        <Route path="/signin" element={signin()} />
        <Route path="/signup" element={signup()} />
        {/*Seller pages*/}
        <Route path="/sell" element={sell()} />
        {/*Buy pages*/}
        <Route path="/search+q/:id" element={search()} />
        <Route path="/user/:id" element={user()} />
        <Route
          path="*"
          element={
            <h1 className="text-center	align-middle mt-20 text-2xl	">
              404 Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
