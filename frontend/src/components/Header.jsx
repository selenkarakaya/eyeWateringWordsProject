import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Logo from "./image/logo.png";
import SearchEntry from "../pages/SearchEntry";
import { FaSignOutAlt } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { TfiThought } from "react-icons/tfi";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    dispatch(logout());
    toast("Bye for now", {
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <header className="border-b-2 border-darkGreen">
      <div className="flex justify-center">
        <div className="wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/">
          <img src={Logo} alt="logo" className="w-60 h-60" />
        </Link>
      </div>
      <div className="md:mx-4 lg:grid lg:grid-cols-3 gap-4 mb-4 space-y-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="gradient text-xl ml-4 text-center invisible lg:visible"
          >
            Eye Watering Words
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <SearchEntry />
        </div>
        <div className="flex space-x-3 items-center lg:justify-end justify-center">
          <ul>
            {user ? (
              <div className="flex">
                <Link
                  to="/NewEntry"
                  className="flex items-center space-x-1 px-3 py-1  hover:bg-darkGreen hover:text-white rounded-lg transition ease-in-out delay-150 duration-500"
                >
                  <TfiThought
                    style={{
                      color: "#95d5b2",
                      fontSize: "1.2rem",
                    }}
                  />
                  <p>Add entry</p>
                </Link>
                <button>
                  <Link
                    to="/Profile"
                    // to={`/Profile/${user._id}`}
                    className="flex items-center space-x-1 px-3 py-1  hover:bg-darkenGreen hover:text-white rounded-lg transition ease-in-out delay-150 duration-500"
                  >
                    <RiUserHeartLine className="animate-bounce" />
                    <p>My account</p>
                  </Link>
                </button>
                <div className="flex  items-center bg-darkGreen rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-mediumGreen transition ease-in-out delay-150 duration-1000">
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
                <button className="border-2 border-darkYellow px-3 py-1 hover:scale-105 rounded-lg mr-1">
                  <Link to="/login" className=" gradient">
                    Log in
                  </Link>
                </button>
                <button className="border-2 border-darkYellow px-3 py-1 hover:scale-105 rounded-lg">
                  <Link to="/register" className="gradient">
                    Register
                  </Link>
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
      <section>
        <ul className="flex justify-around text-darkenGreen">
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
