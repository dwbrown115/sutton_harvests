import "./searchBar.scss";

export default function searchBar() {
  return (
    <div className="px-8 py-3 flex justify-between border-b border-slate-400">
      <div className="mx-2 text-4xl font-semibold tracking-tight text-slate-700">
        Sutton Harvests
      </div>
      <form className="align-middle flex form">
        <div className="flex border border-slate-700 mr-5">
          <input
            className="px-2 py-1 h-1/1 searchBar"
            type="search"
            placeholder="Search for your next harvest"
          />
          <select className="px-2 py-1 h-1/1 focus:outline-none border-l border-slate-400 w-52">
            <option value="All">All</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Herb">Herb</option>
            <option value="Nuts">Nuts</option>
            <option value="Grains">Grains</option>
            <option value="Meat">Meat</option>
            <option value="Cheese">Cheese</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="px-10 mr-2 border border-slate-700 py-1 h-1/1 back bg-3665f3 text-white ">
          Search
        </button>
      </form>
    </div>
  );
}
