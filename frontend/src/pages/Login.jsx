import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  //set form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        toast.success(
          `Hello ${
            user.name.split(" ")[0].charAt(0).toUpperCase() +
            user.name.split(" ")[0].slice(1).toLowerCase()
          } 🫂  `
        );
        navigate("/");
        window.location.reload();
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col items-center mt-10 bg-lightestGreen w-1/2 mx-auto rounded-xl">
      <header className="my-4">
        <h1 className="text-center">Log In</h1>
        <p>Please log in and kick entries </p>
      </header>
      <form className="p-4" onSubmit={onSubmit}>
        <div className="my-2">
          <input
            type="email"
            className="w-full p-4 ps-10 text-sm rounded-lg text-darkGreen focus:outline-darkYellow focus:outline-4"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full p-4 ps-10 mt-2 text-sm rounded-lg text-darkGreen focus:outline-darkYellow focus:outline-4"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
          <p className="my-4">
            New to Eye watering words?
            <Link to="/Register" className="text-mediumGreen ml-2">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="text-center mt-4">
          <button className="bg-darkenGreen hover:bg-darkGreen w-1/3 p-4 rounded-lg text-white transition duration-1000 delay-150">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
