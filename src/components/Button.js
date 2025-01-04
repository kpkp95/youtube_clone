const Button = ({ btnName, onClick, isSelected }) => {
  return (
    <button
      className={`px-4 py-1  rounded-lg text-sm whitespace-nowrap ${
        isSelected
          ? "bg-black text-white" // Darker background and white text for selected tab
          : "bg-gray-200 text-black hover:bg-gray-300 hover:shadow-md transition duration-200"
      }`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};

export default Button;
