import { Routes, Route } from "react-router-dom";

import { signin, signup, forgotPassword } from "./pages/Auth";
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
        <Route path="/signin" element={signin()} />
        <Route path="/signup" element={signup()} />
        <Route path="/forgot-password" element={forgotPassword()} />
        <Route path="/search+q/:id" element={search()} />
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
