import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
  };

  return (
    <div className="p-5 bg-gray-100 text-center">
      <button
        onClick={goToAbout}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 duration-200"
      >
        Go to About Page
      </button>

    </div>
  );
};

export default Footer;
