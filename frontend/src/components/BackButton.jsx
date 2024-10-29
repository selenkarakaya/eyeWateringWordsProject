import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// NOTE: here navigate the user in the history stack for a true 'back' button

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center space-x-2 my-4 ml-2 bg-darkGreen text-white px-4  md:px-8 md:py-2 rounded-md hover:opacity-90"
      onClick={() => navigate(-1)}
    >
      <FaArrowCircleLeft /> <p>Back</p>
    </button>
  );
};

export default BackButton;

//onClick={() => navigate(-1)
//or
//<Link to{url} lassName='btn btn-reverse btn-back' > <FaArrowCircleLeft /> Back  </Link> (link tagi ile url verilip de yapilir)
