import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH } from "./ApiLinks";
import axios from "axios";

const useListOfSearchedVideos = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [searchedVideos, setSearchedVideos] = useState(null);

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(YOUTUBE_SEARCH + searchQuery);
      setSearchedVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchQuery]);
  return searchedVideos;
};

export default useListOfSearchedVideos;