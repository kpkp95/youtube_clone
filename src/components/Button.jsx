const Button = ({ btnName, onClick, isSelected }) => {
  return (
    <button
      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base whitespace-nowrap transition-colors duration-200 border ${
        isSelected
          ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
          : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
      }`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};
 
export default Button;
