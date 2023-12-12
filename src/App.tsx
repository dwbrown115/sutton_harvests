import { Routes, Route } from "react-router-dom";

// Account bar pages
import {
  accountActivity,
  accountMessages,
  account,
} from "./pages/AccountBarPages";

// Account pages
import { paymentMethods } from "./pages/AccountBarPages/accountPages/paymentInfo";
import {
  accountSettings,
  securitySettings,
  addresses,
} from "./pages/AccountBarPages/accountPages/personalInfo";
import { sellerAccount, sellerDashboard, user } from "./pages/SellerPages";

// Auth pages
import { forgotPassword, signin, signup } from "./pages/Auth";

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
        {/*Account bar pages*/}
        <Route path="/activity" element={accountActivity()} />
        <Route path="/messages" element={accountMessages()} />
        <Route path="/account" element={account()} />
        {/*Account Info pages*/}
        <Route path="/account/info" element={accountSettings()} />
        <Route path="/account/security-settings" element={securitySettings()} />
        <Route path="/account/addresses" element={addresses()} />
        {/*Payment Info pages*/}
        <Route path="/account/payment-methods" element={paymentMethods()} />
        {/*Sales Info pages*/}
        <Route path="/account/sales-dashboard" element={sellerDashboard()} />
        <Route path="/account/sales" element={sellerAccount()} />
        {/*Auth pages*/}
        <Route path="/forgot-password" element={forgotPassword()} />
        <Route path="/signin" element={signin()} />
        <Route path="/signup" element={signup()} />
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
