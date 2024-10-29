import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createImage } from "../features/avatar/avatarSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getAvatar,
  deleteAvatar,
  getAvatarS,
} from "../features/avatar/avatarSlice";

function AvatarForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { avatars } = useSelector((state) => state.avatars);
  const { avatar } = useSelector((state) => state.avatars);

  const setimgFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    dispatch(getAvatar());
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line
    avatars.map((avatar) => {
      if (avatar.user === user._id) {
        dispatch(getAvatarS(avatar._id));
      }
    });
  }, [dispatch, avatars, user._id]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (avatar.user === user._id) {
      const avatarId = avatar._id;
      dispatch(deleteAvatar({ avatarId }));
    }
    const formData = new FormData();
    formData.append("photo", file);
    dispatch(createImage(formData));
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <form
        action="/upload"
        method="POST"
        encType="multipart/form-data"
        className="w-1/2 flex flex-col  justify-center items-center mx-auto my-6 bg-lightestGreen rounded-xl"
        onSubmit={onSubmit}
      >
        <label htmlFor="file" className="my-6">
          Add magnificent avatar
        </label>
        <input
          type="file"
          lable="Image"
          name="file"
          id="file"
          accept=".jpeg, .png, .jpg"
          onChange={setimgFile}
          required
        />
        <button className="bg-darkGreen w-1/2 py-4 text-white rounded-lg my-6">
          Submit
        </button>
      </form>
    </>
  );
}

export default AvatarForm;
