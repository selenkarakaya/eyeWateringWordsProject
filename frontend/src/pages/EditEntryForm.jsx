import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getEntry, updateEntry } from "../features/entry/entrySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";

function EditEntryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { entry, isError, message } = useSelector((state) => state.entries);
  const { entryId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getEntry(entryId));
  }, [isError, message, entryId, dispatch]);

  useEffect(() => {
    setTag(entry.tag);
    setDescription(entry.description);
  }, [entry]);

  const onChange = (e) => {
    if (e.target.id === "tag") {
      setTag(e.target.value);
    } else if (e.target.id === "description") {
      setDescription(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updateData = { tag, description };
    dispatch(updateEntry({ updateData, entryId }));
    navigate("/Profile");
  };

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
            defaultValue={user.username}
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
            onChange={onChange}
          ></textarea>
          <textarea
            type="text"
            name="description"
            id="description"
            className="w-full h-32 border border-darkRed rounded-lg bg-gray-50 focus:ring-purple focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-darkRed dark:focus:border-darkRed"
            placeholder="Text"
            value={description}
            onChange={onChange}
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

export default EditEntryForm;
