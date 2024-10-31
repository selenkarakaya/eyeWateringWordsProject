import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { generate } from "random-words";
import { PiCircleNotchThin } from "react-icons/pi";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [randomUsername, setRandomUsername] = useState("");

  const [hover, setHover] = useState(false);
  //set form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, username, email, password, password2 } = formData;
  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    const isLength = password.length >= 8;
    const hasUppercase = password
      .split("")
      .some(
        (char) => char === char.toUpperCase() && char !== char.toLowerCase()
      );
    const hasLowerCase = password
      .split("")
      .some(
        (char) => char === char.toLowerCase() && char !== char.toUpperCase()
      );
    const hasDigit = password
      .split("")
      .some((char) => !isNaN(parseInt(char, 10)));
    return isLength && hasUppercase && hasLowerCase && hasDigit;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      password !== password2 ||
      !validateEmail(email) ||
      validatePassword(password)
    ) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, username, email, password };
      // console.log(username);
      dispatch(register(userData));
      // navigate("/");
    }
  };

  const onNickname = (e) => {
    const name = generate({
      exactly: 1,
      wordsPerString: 3,
      formatter: (word) => word.slice(0, 1).toUpperCase().concat(word.slice(1)),
    });
    const nick =
      name[0].replaceAll(" ", "_") + Math.floor(Math.random() * 1000);
    document.querySelector("#registerForm input[name=username]").value = nick;
    setRandomUsername(nick);
  };

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
    <div className="flex flex-col items-center w-3/4 mx-auto my-6 bg-lightestGreen rounded-xl">
      <header className="my-4">
        <h1 className="text-center">Register</h1>
        <p>Please create an account</p>
      </header>
      <form className="w-3/4" onSubmit={onSubmit} id="registerForm">
        <div>
          <input
            type="text"
            className="w-full p-4 ps-10 text-sm text-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
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
            className="w-full p-4 ps-10 text-sm text-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            id="username"
            name="username"
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
                <div className="w-24 h-24 shadow-hover">
                  <p>Generate random username</p>
                </div>
              </div>
            ) : (
              <PiCircleNotchThin
                onClick={onNickname}
                className="cursor-pointer"
                style={{
                  color: "#2d6a4f",
                  fontSize: "2.5rem",
                  fontWeight: "200",
                }}
              />
            )}
          </div>
        </div>
        <div>
          <input
            type="email"
            className="w-full p-4 ps-10 text-sm text-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            className="my-2 w-full p-4 ps-10 text-sm text-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
            required
          />
          <input
            type="password"
            className="mb-2 w-full p-4 ps-10 text-sm text-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            id="password2"
            name="password2"
            value={password2}
            onChange={onChange}
            placeholder="Confirm password"
            required
          />
          <p>
            Already a Eye watering worder?
            <Link to="/Register" className="text-mediumGreen ml-1">
              Log In
            </Link>
          </p>
        </div>
        <div className="text-center my-4">
          <button className="w-1/3 p-4 rounded-lg gradient border-2 border-darkYellow">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
