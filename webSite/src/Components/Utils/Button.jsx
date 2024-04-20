const Button = ({ text ,onClick}) => {
  return (
    <button type="submit" className="bg-primary text-white p-3 rounded-full" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
