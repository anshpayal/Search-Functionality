import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import useListOfSearchedVideos from "../utils/useListOfSearchedVideos";
import { Home } from "lucide-react";
import { MoonLoader } from "react-spinners";

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const listOfSearchedVideos = useListOfSearchedVideos();
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  if (listOfSearchedVideos === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        <MoonLoader size={32} color="#0044cc" />
      </div>
    );
  }

  const totalPages = Math.ceil(listOfSearchedVideos.length / resultsPerPage);

  const currentResults = listOfSearchedVideos.slice(0, currentPage * resultsPerPage);

  const loadMoreResults = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='h-screen'>
      <div className='text-center p-4'>
        <Link to="/">
          <div className="w-full flex justify-center items-center gap-3 my-4 cursor-pointer">
            <Home />
            <span>Go to home</span>
          </div>
        </Link>
        <h1 className='text-3xl'>Search Results</h1>
        <div className="flex justify-center">
          <div className="sm:w-8/12">
            <SearchBox initialValue={query} />
          </div>
        </div>
        <div className='mt-4'>
          <h2 className='text-xl'>Results for: {query}</h2>
        </div>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentResults.map((video) => {
          return (
            <div key={video?.id?.videoId} className="p-3 border rounded-md border-gray-300 hover:shadow-lg transition-shadow duration-200">
              <div className="w-full h-48 overflow-hidden rounded-t-md">
                <img
                  alt="thumbnail"
                  src={video?.snippet?.thumbnails?.high?.url}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3">
                <h1 className="text-lg sm:text-xl font-semibold line-clamp-2">
                  {video?.snippet?.title}
                </h1>
                <p className="text-md mt-1 text-gray-600">
                  {video?.snippet?.channelTitle}
                </p>
                <p className="text-sm mt-1 text-gray-600 truncate">
                  {video?.snippet?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-center mt-4'>
        {currentPage < totalPages && (
          <button
            onClick={loadMoreResults}
            className='mx-1 mb-4 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;