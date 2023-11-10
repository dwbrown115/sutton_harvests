import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, signin, signup } from "./pages";
import { UserBar, SearchBar } from "./components";

import "./App.scss";

function App() {
  return (
    <div className="">
      <Router>
        <UserBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/signin" element={signin()} />
          <Route path="/signup" element={signup()} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
