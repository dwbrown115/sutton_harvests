import { useState, useEffect } from "react";
import algoliasearch from "algoliasearch";
import { Link } from "react-router-dom";

import { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_KEY } from "../../../config";

export default function search() {
  // const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [numberResults, setNumberResults] = useState(0);
  const [loading, setLoading] = useState(false);

  function searchAlgolia() {
    setLoading(true);
    var client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_KEY);
    var index = client.initIndex("Listings");
    try {
      index.search(`${search}+${category}`).then(function (responses) {
        const resultsArray = [];
        resultsArray.push(...responses.hits);
        // console.log(resultsArray);
        setResults(resultsArray);
        setLoading(false);
        setNumberResults(resultsArray.length);
        // console.log(resultsArray);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    searchAlgolia();
  }, [search, category]);

  useEffect(() => {
    const url = window.location.href;
    const splitUrl = url.split("/search+q/");
    let search = "";
    let category = "";
    if (url.includes("/search+q/")) {
      search = splitUrl[1].split("&category+")[0];
      category = splitUrl[1].split("&category+")[1];
      setSearch(search.replaceAll("+", " "));
      setCategory(category);
    }
    // setUrl(url);
  }, []);

  function handleResults() {
    return (
      <div>
        <div>
          {/* <div>Search Results</div> */}
          <div>
            <span className="font-bold">{numberResults}</span> results{" "}
            {search ? `for "${search}"` : ""}
            {/* for <span className="font-bold">{search}</span> */}
          </div>
        </div>
        {/* <hr className="my-2 border-gray-300" /> */}
        <div>
          {results.length ? (
            <div>
              {results.map((result, index) => {
                // console.log(result.priceType);
                return (
                  <div
                    className="flex py-2.5 mt-2.5 border-t border-b border-gray-300"
                    key={index}
                  >
                    <Link
                      target="_blank"
                      className="w-1/3"
                      to={`/listing/${result.listingId}`}
                    >
                      <img
                        src={result.images[0]}
                        alt={result.title}
                        className="w-full"
                      />
                    </Link>
                    <div className="flex flex-col pl-4">
                      <Link
                        className="text-3xl font-light hover:text-purple"
                        target="_blank"
                        to={`/listing/${result.listingId}`}
                      >
                        {result.title}
                      </Link>
                      <div className="flex mt-2">
                        <div className="mr-10">
                          <div className="text-3xl font-medium">
                            ${result.price} per {result.priceType}
                          </div>
                          <div className="mt-2 text-gray-600">
                            Number in stock: {result.quantity}
                            {result.priceType}s
                          </div>
                          <div className="text-gray-600">
                            {result.freeShipping ? (
                              "Free Shipping"
                            ) : (
                              <div>Shipping: ${result.shippingCost}</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Link
                            target="_blank"
                            className="inline-block	text-l text-gray-600 hover:text-purple"
                            to={`/user/${result.createdByUserId}`}
                          >
                            {result.createdByUserName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-1">No results found</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 pt-2">
      {loading ? <div>Loading...</div> : handleResults()}
    </div>
  );
}
