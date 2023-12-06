import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const handleNavigation = () => {
    setShow(false);
    setShowInput(false);
  };

  const handleSearch = () => {
    if (search) {
      navigate(`movie/search/${search.trim()}`);
      setSearch("");
      setShow(false);
      setShowInput(false);
    }
  };

  return (
    <div className="h-[60px] bg-gray-900 text-gray-200 sticky top-0 z-[999]">
      <ContentWrapper>
        <div className="flex justify-between items-center  text-center font-bold ">
          <h1
            className="text-[36px] font-[600] cursor-pointer text-orange-400"
            onClick={() => {
              handleNavigation();
              navigate("/");
            }}
          >
            MoGo
          </h1>
          <div className="hidden gap-[50px] items-center res_hlg:flex">
            <ul className="flex gap-[30px]">
              <li className="cursor-pointer hover:text-orange-400 transition-all">
                <NavLink to="/movie/popular">Popular</NavLink>
              </li>
              <li className="cursor-pointer hover:text-orange-400 transition-all">
                <NavLink to="/movie/top_rated">Top Rated</NavLink>
              </li>
              <li className="cursor-pointer hover:text-orange-400 transition-all">
                <NavLink to="/movie/upcoming">Upcoming</NavLink>
              </li>
            </ul>
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="text"
                color="white"
                label="Search Movies..."
                className="pr-[52px]"
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button
                size="sm"
                color="green"
                className="!absolute right-1 top-[6px] rounded"
                onClick={handleSearch}
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-[20px] res_hlg:hidden">
            <span
              className="cursor-pointer"
              onClick={() => {
                setShowInput((prev) => !prev);
                setShow(false);
              }}
            >
              <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                setShow((prev) => !prev);
                setShowInput(false);
              }}
            >
              {show ? (
                <i className="fa-solid fa-xmark fa-xl"></i>
              ) : (
                <i className="fa-solid fa-bars fa-xl"></i>
              )}
            </span>
          </div>
          {show && (
            <div className="absolute left-0 top-[60px] w-full flex res_hlg:hidden justify-center bg-gray-900 text-center text-gray-200">
              <ul className="flex flex-col gap-[20px] justify-center my-[10px] ">
                <li
                  onClick={handleNavigation}
                  className="cursor-pointer hover:text-orange-400 transition-all"
                >
                  <NavLink to="/movie/popular">Popular</NavLink>
                </li>
                <li
                  onClick={handleNavigation}
                  className="cursor-pointer hover:text-orange-400 transition-all"
                >
                  <NavLink to="/movie/top_rated">Top Rated</NavLink>
                </li>
                <li
                  onClick={handleNavigation}
                  className="cursor-pointer hover:text-orange-400 transition-all"
                >
                  <NavLink to="/movie/upcoming">Upcoming</NavLink>
                </li>
              </ul>
            </div>
          )}
          {showInput && (
            <div className="absolute top-[60px] left-0 h-[70px] w-full  res_hlg:hidden bg-gray-900">
              <ContentWrapper>
                <input
                  className=" w-full p-[15px] res_hlg:hidden border outline-none text-black rounded"
                  placeholder="Search Movies..."
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </ContentWrapper>
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Header;
