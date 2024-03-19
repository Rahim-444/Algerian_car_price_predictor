const Button = ({ text }) => {
  return (
    <button type="submit" className="bg-primary text-white p-2 rounded-full">
      {text}
    </button>
  );
};

export default Button;
