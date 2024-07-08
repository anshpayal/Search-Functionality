import { useEffect, useState } from "react";
import { YOUTUBE_SEARCHSUGGESTIONS_API } from "../utils/ApiLinks";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBox = ({ initialValue = "" }) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();
  const [cache, setCache] = useState({});

  const handleFocus = () => {
    setShowSuggestion(true);
  };

  const searchSuggestions = async (query) => {
    if (cache[query]) {
      setSuggestion(cache[query]);
    } else {
      if (query.length >= 3) {
        const data = await fetch(YOUTUBE_SEARCHSUGGESTIONS_API + query);
        const json = await data.json();
        const suggestions = json[1];
        setCache((prevCache) => ({
          ...prevCache,
          [query]: suggestions,
        }));
        setSuggestion(suggestions);
        console.log(json);
      } else {
        setSuggestion([]);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchSuggestions(searchValue);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
    setSearchValue("");
  };

  return (
    <div className='text-center relative'>
      <div className="relative flex justify-center mt-4">
        <input
          type="text"
          placeholder='Search youtube videos'
          className='w-9/12 h-8 sm:w-full sm:h-11 border-l border-t border-b text-sm px-2 sm:text-lg sm:px-7 rounded-l-3xl border-gray-200 outline-none'
          value={searchValue}
          onChange={(e) => { setSearchValue(e.target.value) }}
          onFocus={handleFocus} />
        <button className='text-lg border-t border-b border-r rounded-r-full px-3 h-8 sm:text-2xl sm:px-6 sm:h-11 bg-blue-500 text-white hover:bg-blue-600' onClick={handleSearch}>
          <Search />
        </button>
      </div>
      {showSuggestion && (
        <div className="mt-1 w-9/12 sm:w-10/12 absolute left-1/2 transform -translate-x-1/2">
          <ul className="px-2 bg-white border border-gray-300 rounded-lg text-left shadow-lg">
            {suggestion.map((suggestions, index) => (
              <Link key={index} to={"/search?query=" + suggestions}>
                <li onClick={() => { setSuggestion([]); }} className="p-1 flex my-1 items-center bg-white hover:bg-gray-100 cursor-pointer rounded-md">
                  <Search className="mr-2" />
                  {suggestions}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;