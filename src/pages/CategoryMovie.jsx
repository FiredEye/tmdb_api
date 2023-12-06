import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useMovieByCategoryQuery } from "../features/movieApi";

import Error from "../components/ErrorPage";
import Image from "../components/lazyLoadImage/Image";
import ContentWrapper from "../components/ContentWrapper";
import FallbackPosterImage from "../assets/no-poster.png";

const CategoryMovie = () => {
  const { category, page } = useParams();
  const Category =
    category === "top_rated"
      ? "Top Rated"
      : category === "popular"
      ? "Popular"
      : "Upcoming";
  const navigate = useNavigate();

  const { data, isLoading, error, isError, isFetching } =
    useMovieByCategoryQuery({
      category: category || "now_playing",
      page: page || 1,
    });

  const skeleItem = () => (
    <div className="mb-[20px] flex flex-col gap-[14px] cursor-pointer">
      <div className="relative w-full aspect-[1/1.5] rounded-lg skeleton"></div>
      <div className="flex flex-col">
        <div className="w-full h-[20px] mb-[10px] skeleton"></div>
        <div className="w-[70%] h-[20px] skeleton"></div>
      </div>
    </div>
  );

  if (isError) return <Error error={error} />;

  return (
    <div className="min-h-screen">
      <ContentWrapper>
        {category && (
          <div className="text-[24px] font-[600] ms-5 my-3">
            {Category} Movies:
          </div>
        )}
        {!isFetching ? (
          <>
            {data?.results ? (
              <>
                {!isFetching && (
                  <div className="grid grid-cols-1 gap-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 mt-5 mx-5">
                    {data?.results?.map((movie, i) => (
                      <div
                        key={i}
                        className="mb-[20px] flex flex-col gap-[14px] cursor-pointer rounded-lg"
                        onClick={() => navigate(`/movie/detail/${movie?.id}`)}
                        title={movie?.title}
                      >
                        <div className="relative w-full aspect-[1/1.5] rounded-xl overflow-hidden">
                          <Image
                            src={
                              movie?.poster_path || movie?.poster_path !== null
                                ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
                                : FallbackPosterImage
                            }
                            alt="movie image"
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
                )}
              </>
            ) : (
              <span className="text-[24px] sm:text-[32px] md:text-[46px] font-bold p-5">
                Sorry, Results not found
              </span>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 justify-between res_xm:grid-cols-2 res_sm:grid-cols-3 res_md:grid-cols-4 mt-5 mx-5">
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
        {!isFetching && category && (
          <div className="flex justify-center px-5 my-5 gap-4 items-center">
            <button
              onClick={() => {
                navigate(
                  `/movie/${category ? category : "now_playing"}/${
                    data?.page - 1
                  }`
                );
              }}
              className="py-2 px-4 rounded bg-red-500"
              disabled={page == 1 || page == undefined ? true : false}
            >
              Prev
            </button>
            <p>{data?.page}</p>
            <button
              onClick={() => {
                navigate(
                  `/movie/${category ? category : "now_playing"}/${
                    data?.page + 1
                  }`
                );
              }}
              className="py-2 px-4 rounded bg-red-500"
              disabled={page >= data?.total_pages ? true : false}
            >
              Next
            </button>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default CategoryMovie;
