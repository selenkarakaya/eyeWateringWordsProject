import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { FaPlus } from "react-icons/fa";
import { getNotes, createNote, updateNote } from "../features/notes/noteSlice";

import Modal from "react-modal";
import { set } from "mongoose";

function NoteItem({ note, ticketId }) {
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      // setNoteText("reader.result");
    }
  };

  const onImage = (e) => {
    e.preventDefault();
    const noteId = note._id;

    const token = user.token;
    console.log(image);

    dispatch(updateNote({ image, ticketId, noteId, token }));
  };
  return (
    <div className="flex">
      <p>{note.text}</p>

      <h1>image</h1>
      <img alt="not found" width={"250px"} src={image} />
      <h2>Add image</h2>
      <button className="btn-close">X</button>
      <form onSubmit={onImage}>
        <div className="form-group">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteItem;
