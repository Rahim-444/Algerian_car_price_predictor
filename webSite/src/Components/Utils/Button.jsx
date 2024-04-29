const Button = ({ text ,onClick , ref}) => {
  return (
    <button ref={ref} type="submit" className="bg-primary text-white py-3 px-6  rounded-lg m-2" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
