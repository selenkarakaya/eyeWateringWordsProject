import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { generate, count } from "random-words";
import { PiCircleNotchThin } from "react-icons/pi";

function Register() {
  //set form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, username, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, username, email, password };
      dispatch(register(userData));
      navigate("/");
    }
  };
  const [placeholder, setPlaceholder] = useState("");
  const onNickname = (e) => {
    const name = generate({
      exactly: 1,
      wordsPerString: 3,
      formatter: (word) => word.slice(0, 1).toUpperCase().concat(word.slice(1)),
    });
    const nick =
      name[0].replaceAll(" ", "_") + Math.floor(Math.random() * 1000);
    setPlaceholder(nick);
    setTimeout(() => {
      setPlaceholder(" ");
    }, 3000);
  };

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col items-center w-3/4 mx-auto my-6 bg-zinc-50 rounded-xl">
      <header className="my-4">
        <h1 className="text-center">Register</h1>
        <p>Please create an account</p>
      </header>
      <form className="w-3/4" onSubmit={onSubmit}>
        <div className="">
          <input
            type="text"
            className="w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="name"
            required
          />
        </div>
        <div className="flex my-2">
          <input
            type="text"
            className="w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
            required
          />
          <div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            role="button"
            tabIndex="-3"
          >
            {hover ? (
              <div className="flex">
                <PiCircleNotchThin
                  onClick={onNickname}
                  className="cursor-pointer"
                  style={{
                    color: "darkRed",
                    fontSize: "2.5rem",
                    fontWeight: "200",
                  }}
                />
                <p>Generate random username</p>
              </div>
            ) : (
              <PiCircleNotchThin
                onClick={onNickname}
                className="cursor-pointer"
                style={{
                  color: "darkRed",
                  fontSize: "2.5rem",
                  fontWeight: "200",
                }}
              />
            )}
          </div>
        </div>
        <p className="my-4">{placeholder ? placeholder : " "}</p>
        <div>
          <input
            type="email"
            className="w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            className="my-2 w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
          <input
            type="password"
            className="mb-2 w-full p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm password"
            required
          />
          <p>
            Already a Eye watering worder?
            <Link to="/Register" className="text-mediumRed ml-1">
              Log In
            </Link>
          </p>
        </div>
        <div className="form-group text-center my-4">
          <button className="bg-mediumBlue hover:bg-darkBlue w-1/3 p-4 rounded-lg text-center text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
