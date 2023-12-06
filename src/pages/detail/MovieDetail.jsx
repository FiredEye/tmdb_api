import { useParams } from "react-router-dom";
import {
  useGetVideosByMovieIdQuery,
  useGetCrewByMovieIdQuery,
} from "../../features/movieApi";
import Similar from "./Similar";
import Recommend from "./Recommend";
import DetailBanner from "./DetailBanner";
import Casts from "./Casts";
import VideoSection from "./videoSection/VideoSection";

const MovieDetail = () => {
  const { id } = useParams();
  const {
    data: vData,
    isLoading: vIsLoading,
    isFetching: vIsFetching,
  } = useGetVideosByMovieIdQuery(id);
  const { data, isLoading, isFetching } = useGetCrewByMovieIdQuery(id);

  return (
    <>
      <DetailBanner crew={data?.crew} />
      <Casts data={data?.cast} loading={isLoading} fetching={isFetching} />
      <VideoSection
        data={vData?.results}
        loading={vIsLoading}
        fetching={vIsFetching}
      />
      <Similar movieId={id} />
      <Recommend movieId={id} />
    </>
  );
};

export default MovieDetail;
