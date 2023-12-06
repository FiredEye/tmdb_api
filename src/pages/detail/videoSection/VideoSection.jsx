import { useState } from "react";
import Image from "../../../components/lazyLoadImage/Image";
import ContentWrapper from "../../../components/ContentWrapper";
import VideoPopUp from "../../../components/videoPopUp/VideoPopUp";
import "./videoSection.scss";

const VideoSection = ({ data, loading, fetching }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const skeleton = () => {
    return (
      <div className="w-[150px] md:w-[calc(25%-20px)] shrink-0 ">
        <div className="w-full aspect-[16/9] rounded-xl mb-[10px] skeleton"></div>
        <div className="w-full h-[20px] rounded-lg mb-[10px] skeleton"></div>
        <div className="w-[75%] h-[20px] rounded-lg skeleton"></div>
      </div>
    );
  };
  return (
    <div className="relative py-[20px]">
      <ContentWrapper>
        <div className="text-[24px] mb-[24px] font-[600]">Official Videos:</div>
        {!loading ? (
          <>
            {data?.length > 0 ? (
              <>
                {!fetching && (
                  <div className="relative">
                    <div
                      className="absolute right-[-1px] top-0 w-[85px] h-full z-10"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(4, 21, 45, 0) 0%, rgb(60,60,60) 70%)",
                      }}
                    ></div>
                    <div className="flex w-full gap-[25px] overflow-x-auto md:gap-[20px]">
                      {data?.map((video) => (
                        <div
                          className="w-[150px] md:w-[calc(25%-20px)] shrink-0 cursor-pointer"
                          key={video.id}
                          onClick={() => {
                            setVideoId(video?.key);
                            setShow(true);
                          }}
                        >
                          <div className="videoThumbnail">
                            {/* `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` */}
                            <Image
                              src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                              alt={`thumbnail image`}
                            />
                            <span className="playBtn">
                              <i className="fa-regular fa-circle-play"></i>
                            </span>
                          </div>
                          <div className="text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] ">
                            {video?.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <span className="text-[24px]font-bold py-5 opacity-[0.7]">
                Sorry, Results not found
              </span>
            )}
          </>
        ) : (
          <div className="flex w-full gap-[25px] overflow-x-auto md:gap-[20px]">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
