import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { useMovieBySimilarityQuery } from "../../features/movieApi";
import Error from "../../components/ErrorPage";
import Image from "../../components/lazyLoadImage/Image";
import ContentWrapper from "../../components/ContentWrapper";
import FallbackPosterImage from "../../assets/no-poster.png";

const Similar = ({ movieId }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, isFetching } =
    useMovieBySimilarityQuery(movieId);

  const skeleItem = () => (
    <div className="mb-[20px] mt-[20px] w-[125px] sm:w-[calc(25%-15px)] md:w-[calc(20%-16px)] flex flex-col gap-[14px] cursor-pointer rounded-lg shrink-0">
      <div className="relative w-full aspect-[1/1.5] rounded-xl skeleton"></div>
      <div className="flex flex-col">
        <div className="w-full h-[20px] mb-[10px] skeleton"></div>
        <div className="w-[70%] h-[20px] skeleton"></div>
      </div>
    </div>
  );

  if (isError) return <Error error={error} />;

  return (
    <div className="py-[20px]">
      <ContentWrapper>
        {movieId && (
          <div className="text-[24px] font-[600] py-5">Similar Movies:</div>
        )}
        {!isLoading ? (
          <>
            {data?.results?.length > 0 ? (
              <>
                {!isFetching && (
                  <div className="relative">
                    <div
                      className="absolute right-[-1px] top-0 w-[70px] h-full z-10"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(4, 21, 45, 0) 0%, rgb(60,60,60) 90%)",
                      }}
                    ></div>
                    <div className="flex w-full gap-5 mb-2 overflow-x-auto">
                      {data?.results?.map((movie, i) => (
                        <div
                          key={i}
                          className="mb-[20px] mt-[20px] w-[125px] sm:w-[calc(25%-15px)] md:w-[calc(20%-16px)] flex flex-col gap-[14px] cursor-pointer rounded-lg shrink-0"
                          onClick={() => navigate(`/movie/detail/${movie?.id}`)}
                          title={movie?.title}
                        >
                          <div className="relative w-full aspect-[1/1.5] rounded-xl overflow-hidden">
                            <Image
                              src={
                                movie.poster_path || movie.poster_path !== null
                                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                                  : FallbackPosterImage
                              }
                              alt="movie poster"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[16px] md:text-[20px] overflow-ellipsis line-clamp-1">
                              {movie?.title}
                            </span>
                            <span className="opacity-[0.5] text-[14px]">
                              {dayjs(movie?.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <span className="text-[24px]font-bold py-5 opacity-[0.7]">
                {" "}
                Sorry, Results not found
              </span>
            )}
          </>
        ) : (
          <div className="flex w-full gap-5 mb-2 overflow-x-auto">
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
            {skeleItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Similar;
