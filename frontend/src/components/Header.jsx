import { FaSignOutAlt } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { TfiThought } from "react-icons/tfi";
import Logo from "./image/logo.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
  };
  return (
    <header className="border-b-2 border-darkPink">
      <div className="flex justify-center">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-60 h-60" />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center mb-4">
        <div>
          <Link to="/" className="text-darkRed text-xl">
            Eye Watering Words
          </Link>
        </div>
        <form className="w-1/3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-black dark:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
              placeholder="Entry"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-purple hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-darkRed font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex space-x-3 items-center">
          <ul>
            {user ? (
              <div className="flex">
                <Link
                  to="/NewEntry"
                  className="flex items-center space-x-1 px-3 py-1 hover:bg-darkBlue hover:text-white rounded-lg"
                >
                  <TfiThought />
                  <p>Add entry</p>
                </Link>
                <Link
                  to="/Profile"
                  className="flex items-center space-x-1 px-3 py-1 hover:bg-darkBlue hover:text-white rounded-lg"
                >
                  <RiUserHeartLine className="animate-bounce" />
                  <p>My account</p>
                </Link>
                <div className="flex items-center bg-darkBlue  rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-mediumBlue">
                  <FaSignOutAlt
                    style={{ color: "white", fontSize: "1.2rem" }}
                  />

                  <Link to="/">
                    <button
                      type="button"
                      className=" text-white "
                      onClick={onLogOut}
                    >
                      Log out
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <button className=" bg-darkRed px-3 py-1 hover:scale-105 hover:bg-mediumRed rounded-lg mr-1">
                  <Link to="/login" className=" text-white">
                    Log in
                  </Link>
                </button>
                <button className="bg-mediumBlue px-3 py-1 hover:scale-105 hover:bg-darkBlue rounded-lg">
                  <Link to="/register" className=" text-white">
                    Register
                  </Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
      <section>
        <ul className="flex justify-around">
          <li>#politics</li>
          <li>#education</li>
          <li>#health</li>
          <li>#lifestyle</li>
        </ul>
      </section>
    </header>
  );
}

export default Header;
