import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewEntry from "./pages/NewEntry";
import Entries from "./pages/Entries";
import SingleEntry from "./pages/SingleEntry";
import CommentItem from "./components/CommentItem";
import AvatarForm from "./pages/AvatarForm";
import EditEntryForm from "./pages/EditEntryForm";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/NewEntry" element={<PrivateRoute />}>
            <Route path="/NewEntry" element={<NewEntry />} />
          </Route>
          <Route path="/Entries" element={<Entries />} />
          <Route path="/entry/:entryId" element={<SingleEntry />} />
          <Route path="/CommentItem" element={<CommentItem />} />
          <Route path="/AvatarForm" element={<AvatarForm />} />
          <Route path="/EditEntry/:entryId" element={<EditEntryForm />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
