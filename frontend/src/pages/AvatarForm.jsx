import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Entries from "./Entries";
import { useSelector } from "react-redux";

import avatar from "../components/image/profile.png";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createImage } from "../features/avatar/avatarSlice";

function AvatarForm() {
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const setimgFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", file);
    dispatch(createImage(formData));
  };

  return (
    <form
      action="/upload"
      method="POST"
      encType="multipart/form-data"
      className="flex flex-col w-1/2 justify-center items-center mx-auto space-y-6 my-6"
      onSubmit={onSubmit}
    >
      <label htmlFor="file">add file</label>
      <input
        type="file"
        lable="Image"
        name="file"
        id="file"
        accept=".jpeg, .png, .jpg"
        onChange={setimgFile}
      />
      <button
        type="submit"
        className="bg-darkBlue w-1/2 py-4 text-white rounded-full"
      >
        Submit
      </button>
    </form>
  );
}

export default AvatarForm;
