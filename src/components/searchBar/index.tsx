import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./searchBar.scss";

export default function searchBar() {
  const router = useNavigate();
  const url = window.location.href;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const queryUrl = `/search+q/${search.replaceAll(
      " ",
      "+"
    )}&category+${category}`;

    router(queryUrl);
    router(0);
  };

  useEffect(() => {
    // console.log(url);
    const splitUrl = url.split("/search+q/");
    // let search = "";
    // let category = "";
    if (url.includes("/search+q/")) {
      // search = splitUrl[1].split("&category+")[0];
      // category = splitUrl[1].split("&category+")[1];
      setSearch(splitUrl[1].split("&category+")[0].replaceAll("+", " "));
      setCategory(splitUrl[1].split("&category+")[1]);
    } else {
      setSearch("");
      setCategory("All");
    }
    // setSearch(search.replaceAll("+", " "));
    // setCategory(category);
  }, [url]);

  return (
    <div className="px-8 py-3 flex justify-between border-b border-slate-400">
      <Link
        to={"/"}
        className="mx-2 text-4xl font-semibold tracking-tight text-slate-700"
      >
        Sutton Harvests
      </Link>
      <form onSubmit={handleSubmit} className="align-middle flex form">
        <div className="flex border border-slate-700 mr-5">
          <input
            className="px-2 py-1 h-1/1 searchBar"
            type="search"
            placeholder="Search for your next harvest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-2 py-1 h-1/1 focus:outline-none border-l border-slate-400 w-52 hover:cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Fruit">Fruits</option>
            <option value="Vegetable">Vegetables</option>
            <option value="Mushroom">Mushrooms</option>
            <option value="Herb">Herbs</option>
            <option value="Nuts">Nuts</option>
            <option value="Grains">Grains</option>
            <option value="Meat">Meat</option>
            <option value="Cheese">Cheese</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-10 mr-2 border border-slate-700 py-1 h-1/1 back bg-3665f3 text-white "
        >
          Search
        </button>
      </form>
    </div>
  );
}
