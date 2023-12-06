import ContentWrapper from "../../components/ContentWrapper";
import Image from "../../components/lazyLoadImage/Image";
import Avatar from "../../assets/avatar.png";
const Casts = ({ data, loading, fetching }) => {
  const skeleton = () => {
    return (
      <div>
        <div className="w-[100px] h-[100px] rounded-[50%] mb-[15px] md:w-[140px] md:h-[140px] skeleton"></div>
        <div className="w-full h-[20px] rounded-[10px] mb-[10px] skeleton"></div>
        <div className="w-[75%] h-[20px] rounded-[10px] mx-auto skeleton"></div>
      </div>
    );
  };
  return (
    <div className="pb-[20px]">
      <ContentWrapper>
        <div className="text-[24px] mb-[24px] font-[600]">Top Cast:</div>
        {!loading ? (
          <>
            {!fetching && (
              <div className="relative">
                <div
                  className="absolute right-[-1px] top-0 w-[90px] h-full z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(4, 21, 45, 0) 0%, rgb(60,60,60) 70%)",
                  }}
                ></div>
                <div className="flex w-full gap-[25px] px-[20px] overflow-x-auto">
                  {data?.map((item) => (
                    <div className="text-center " key={item.id}>
                      <div className="relative w-[100px] h-[100px] rounded-[50%] mb-[15px] md:w-[140px] md:h-[140px] overflow-hidden profileImg">
                        <Image
                          src={
                            !item?.profile_path || item?.profile_path == null
                              ? Avatar
                              : `https://image.tmdb.org/t/p/original${item?.profile_path}`
                          }
                          alt="movie poster"
                        />
                      </div>
                      <div className="text-[14px] leading-[18px] font-[600] md:text-[16px] md:leading-[22px] ">
                        {item?.name}
                      </div>
                      <div className="opacity-[0.5] text-[14px] leading-[18px]">
                        {item?.character}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex w-full gap-[25px] px-[20px] overflow-x-auto">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Casts;
