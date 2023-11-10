import { useState, useEffect } from "react";

export default function search() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const splitUrl = url.split("/search+q/");
    const search = splitUrl[1].split("&category+")[0];
    const category = splitUrl[1].split("&category+")[1];

    setUrl(url);
    setSearch(search.replaceAll("+", " "));
    setCategory(category);
  }, []);
  return (
    <div className="px-10">
      <div>Search Results</div>
      <div>{url}</div>
      <div>{search}</div>
      <div>{category}</div>
    </div>
  );
}
