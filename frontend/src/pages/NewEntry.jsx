import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEntry, reset } from "../features/entry/entrySlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import Title from "../components/Title";

function NewEntry() {
  Title("Submit the beans");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.entries
  );
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
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
      <h1 className="text-lg w-full text-center italic text-darkenGreen">
        Create new entry
      </h1>
      <form className="w-2/3 mx-auto my-6" onSubmit={onSubmit}>
        <div className="md:flex md:flex-col md:space-y-2 md:justify-center md:items-center">
          <textarea
            name="tag"
            id="tag"
            className="w-full md:w-1/2 pl-4 pt-2 border border-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            placeholder="Title"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          ></textarea>
          <textarea
            type="text"
            name="description"
            id="description"
            className="w-full md:w-3/4 pl-4 pt-2 h-32 border border-darkGreen rounded-lg bg-gray-50 focus:outline-darkYellow focus:outline-4"
            placeholder="Text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="md:flex md:space-x-4 space-y-2 md:space-y-0 justify-around my-4">
          <input
            type="text"
            className="md:p-4 w-full ps-10 text-sm text-black border border-darkGreen rounded-lg bg-gray-50"
            defaultValue={user.name}
            disabled
          />
          <input
            type="text"
            className="md:p-4 w-full ps-10 text-sm text-black border border-darkGreen rounded-lg bg-gray-50"
            defaultValue={username}
            disabled
          />
          <input
            type="text"
            className="md:p-4 w-full ps-10 text-sm text-black border border-darkGreen rounded-lg bg-gray-50"
            defaultValue={Date(Date.now()).toLocaleString("en-GB")}
            disabled
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-darkGreen text-white px-8 py-2 rounded-md  hover:opacity-90">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default NewEntry;
