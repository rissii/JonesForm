import { useState } from "react";
import Signup from "../components/Signup";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="overlay m-auto">
      {showModal ? (
        <Signup setShowModal={setShowModal} />
      ) : (
        <div className="home">
          <h1 className="primary-title">Jones Form </h1>
          <h3 className="text-white">Click to register</h3>
          <button className="mt-5 primary-button" onClick={handleClick}>
            Signup
          </button>
        </div>
      )}
    </div>
  );
};
export default Home;
