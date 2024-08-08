import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEntry, reset } from "../features/entry/entrySlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewEntry() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.entries
  );

  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  // const [username, setUsername] = useState("");
  const [username] = useState(user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/Profile");
    }
  }, [dispatch, isError, isLoading, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEntry({ tag, description, username }));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton />
      <section className="text-lg w-2/3 mx-auto">
        <h1>Create new entry</h1>
      </section>
      <form className="w-2/3 mx-auto my-6" onSubmit={onSubmit}>
        <div className="flex space-x-4 justify-around my-4">
          <input
            type="text"
            className="p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            defaultValue={user.name}
            disabled
          />
          <input
            type="text"
            className="p-4 px-20 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            name="username"
            id="username"
            placeholder="username"
            defaultValue={username}
          />
          <input
            id="date"
            type="text"
            className="p-4 ps-10 text-sm text-black border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            defaultValue={Date(Date.now()).toLocaleString("en-GB")}
            disabled
          />
        </div>
        <div className="">
          <textarea
            name="tag"
            id="tag"
            className="w-full  border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            placeholder="Title"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          ></textarea>
          <textarea
            type="text"
            name="description"
            id="description"
            className="w-full h-32 border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            placeholder="Text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button className="bg-darkPink text-white px-8 py-2 rounded-md  hover:opacity-90">
            Post
          </button>
        </div>
      </form>
    </>
  );
}

export default NewEntry;
