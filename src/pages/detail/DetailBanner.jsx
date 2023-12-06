import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { useGetMovieDetailQuery } from "../../features/movieApi";

import ContentWrapper from "../../components/ContentWrapper";
import Image from "../../components/lazyLoadImage/Image";
import Error from "../../components/ErrorPage";
import FallbackPosterImage from "../../assets/no-poster.png";

const DetailBanner = ({ crew }) => {
  const { id } = useParams();
  const { isLoading, isError, error, data, isFetching } =
    useGetMovieDetailQuery(id);
  const director = crew?.filter((d) => d?.job == "Director");
  const writer = crew?.filter(
    (w) => w?.job === "Screenplay" || w?.job === "Story" || w?.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  if (isError) return <Error error={error} />;
  return (
    <div className="md:min-h-[650px] relative mb-0">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.1] overflow-hidden z-[-1]">
        {!isFetching && data?.backdrop_path && data?.backdrop_path != null && (
          <Image
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt={"background poster"}
          />
        )}
      </div>
      <div
        className="h-[250px] w-full absolute bottom-0 left-0 z-[-1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, rgb(60,60,60) 79.17%)",
        }}
      ></div>
      <ContentWrapper>
        {!isLoading ? (
          <>
            {" "}
            {!isFetching && (
              <div className="flex flex-col gap-[25px] md:gap-[50px] md:flex-row py-[20px] sm:py[30px] md:py-[50px] z-10">
                <div className="shrink-0">
                  <div className="relative block w-full md:w-[350px] aspect-[1/1.5] rounded-xl overflow-hidden">
                    <Image
                      src={
                        data?.poster_path || data?.poster_path !== null
                          ? `https://image.tmdb.org/t/p/original${data?.poster_path}`
                          : FallbackPosterImage
                      }
                      alt="movie poster"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[28px] leading-[40px] md:text-[34px] md:leading-[44px]">{`${
                    data?.title
                  } (${dayjs(data?.release_date).format("YYYY")})`}</div>
                  <div className="italic opacity-[0.5] text-[16px] leading-[24px] md:text-[20px] md:leading-[28px] mb-[14px] ">
                    {data?.tagline}
                  </div>
                  <div className="mb-[25px]">
                    <div className="text-[24px] mb-[10px]">Overview</div>
                    <div className="leading-[24px] lg:pr-[100px] ">
                      {data?.overview}
                    </div>
                  </div>
                  <div
                    className="flex py-[10px]"
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {data?.status && (
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="mr-[10px] leading-[24px] font-[600]">
                          Status:{" "}
                        </span>
                        <span className="opacity-[0.8] mr-[10px] leading-[24px]">
                          {data?.status}
                        </span>
                      </div>
                    )}
                    {data?.release_date && (
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="mr-[10px] leading-[24px] font-[600]">
                          Released Date:{" "}
                        </span>
                        <span className="opacity-[0.8] mr-[10px] leading-[24px]">
                          {dayjs(data.release_date).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    )}
                    {data?.runtime && (
                      <div className="mr-[10px] flex flex-wrap">
                        <span className="mr-[10px] leading-[24px] font-[600]">
                          Runtime:{" "}
                        </span>
                        <span className="opacity-[0.8] mr-[10px] leading-[24px]">
                          {toHoursAndMinutes(data?.runtime)}
                        </span>
                      </div>
                    )}
                  </div>
                  {director?.length > 0 && (
                    <div
                      className="flex py-[10px]"
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {" "}
                      <span className="mr-[10px] leading-[24px] font-[600]">
                        Director:{" "}
                      </span>
                      <span className="opacity-[0.8] mr-[10px] leading-[24px]">
                        {director.map((d, i) => (
                          <span key={i}>
                            {d.name} {director.length - 1 !== i && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                  {writer?.length > 0 && (
                    <div
                      className="flex py-[10px]"
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      {" "}
                      <span className="mr-[10px] leading-[24px] font-[600]">
                        Writer:{" "}
                      </span>
                      <span className="opacity-[0.8] mr-[10px] leading-[24px]">
                        {writer.map((w, i) => (
                          <span key={i}>
                            {w.name} {writer.length - 1 !== i && ", "}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-[25px] md:gap-[50px] md:flex-row py-[20px] sm:py[30px] md:py-[50px] z-10">
            <div className="shrink-0 w-full block rounded-lg aspect-[1/1.5] md:max-w-[350px] skeleton"></div>
            <div className="w-full">
              <div className="w-full rounded-[50px] h-[25px] mb-[20px] skeleton"></div>
              <div className="w-[75%] rounded-[50px] h-[25px] mb-[50px] skeleton"></div>
              <div className="w-full rounded-[50px] h-[25px] mb-[20px]  skeleton"></div>
              <div className="w-full rounded-[50px] h-[25px] mb-[20px]  skeleton"></div>
              <div className="w-[50%] rounded-[50px] h-[25px] mb-[50px] skeleton"></div>
              <div className="w-full rounded-[50px] h-[25px] mb-[20px]  skeleton"></div>
              <div className="w-full rounded-[50px] h-[25px] mb-[20px]  skeleton"></div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default DetailBanner;
