import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchEntry, clear } from "../features/entry/allentrySlice";
import { GoCommentDiscussion } from "react-icons/go";
import { PiHandPointingLight } from "react-icons/pi";
import { RiCloseLargeLine } from "react-icons/ri";
import Spinner from "../components/Spinner";
import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    width: "70vw",
    height: "50vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

function SearchEntry() {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { avatars } = useSelector((state) => state.avatars);
  const { entries, isLoading } = useSelector((state) => state.allentry);

  const handleChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchEntry(text));
    setModalIsOpen(true);
  };
  const clearAll = (e) => {
    e.preventDefault();
    dispatch(clear());
    setText("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setText("");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-darkenGreen dark:text-darkenGreen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-partialGreen border border-transparent rounded-lg bg-transparent focus:outline-none"
            placeholder="Search ..."
            required
            value={text}
            onChange={handleChange}
          />
          <div className="absolute end-2.5 bottom-2.5 text-center w-1/3 mx-auto rounded-lg p-0.5 bg-gradient-to-b from-darkestGreen to-lightestGreen hover:from-lightestGreen hover:to-darkestGreen">
            <div className="bg-white px-2 py-1 rounded-[calc(0.5rem-1px)] text-center">
              <button className="text-gray-700" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Search"
      >
        <div className="flex justify-between items-center my-4">
          <h2>Relevance</h2>
          <div className="space-x-2 flex">
            <button onClick={closeModal}>
              <RiCloseLargeLine
                style={{ color: "#081c15", fontSize: "1.2rem" }}
              />
            </button>
            {entries.length > 0 && (
              <button
                onClick={clearAll}
                className="text-white rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-darkGreen to-lightGreen hover:from-lightGreen hover:to-darkGreen"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        {entries.length === 0 && (
          <form className="w-1/2 mx-auto" onSubmit={onSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-darkenGreen dark:text-darkenGreen"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-partialGreen border border-transparent rounded-lg bg-transparent focus:outline-none"
                placeholder="Search ..."
                required
                value={text}
                onChange={handleChange}
              />
              <div className="absolute end-2.5 bottom-2.5 text-center w-1/3 mx-auto rounded-lg p-0.5 bg-gradient-to-b from-darkGreen to-lightGreen hover:from-lightGreen hover:to-darkGreen">
                <div className="bg-white px-2 py-1 rounded-[calc(0.5rem-1px)] text-center">
                  <button className="text-gray-700" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
        <div className="card-list grid grid-cols-2 gap-4 mx-4">
          {entries &&
            entries.map((entry) => (
              <div className="borderCSS" key={entry._id}>
                <div className="bg-lightBeige  p-4 flex flex-col items-start space-y-4 hover">
                  <h1 className="text-end">{entry.tag}</h1>
                  <p>{entry.description}</p>
                  <div className="flex self-end items-center space-x-1">
                    <div>
                      <h5 className="italic text-end">{entry.username}</h5>
                      {new Date(entry.createdAt).toLocaleString("en-UK")}
                    </div>
                    {avatars.map((avatar) => {
                      return (
                        entry.user === avatar.user && (
                          <div className="sign-left shape-outer">
                            <img
                              key={avatar._id}
                              src={require(`../components/uploads/${avatar.file}`)}
                              alt="avatar"
                              className="w-12 h-12 shape-inner sign-left"
                            />
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between mx-2">
                  {user ? (
                    <button onClick={closeModal}>
                      <Link to={`/entry/${entry._id}`}>
                        <GoCommentDiscussion style={{ fontSize: "1.6rem" }} />
                      </Link>
                    </button>
                  ) : (
                    <Link to={"/login"}>
                      <GoCommentDiscussion />
                    </Link>
                  )}
                  {user && user._id === entry.user && (
                    <Link
                      to={"/Profile"}
                      className="hover:scale-125 hover:animate-spin"
                    >
                      <PiHandPointingLight style={{ fontSize: "1.6rem" }} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default SearchEntry;
