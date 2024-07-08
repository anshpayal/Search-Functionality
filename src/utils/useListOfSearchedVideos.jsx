import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH } from "./ApiLinks";

const useListOfSearchedVideos = () => {
  const [searchParams] = useSearchParams();
  const seachQuery = searchParams.get("query");
  const [searchedVideos, setSearchedVideos] = useState(null);
  const fetchVideoData = async () => {
    const data = await fetch(YOUTUBE_SEARCH + seachQuery);
    const json = await data.json();
    setSearchedVideos(json.items);
  };
  useEffect(() => {
    fetchVideoData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[seachQuery]);
  return searchedVideos;
};

export default useListOfSearchedVideos;