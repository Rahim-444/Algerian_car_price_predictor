import Button from "../Components/Utils/Button.jsx";
const Form = () => {
  return (
    <>
      <form
        className="flex flex-col w-screen h-screen items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          // const formData = new FormData(e.target);
          // const data = Object.fromEntries(formData);
          console.log(e.target);
        }}
      >
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="name" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
        />
        <br />
        <Button text="Submit" />
      </form>
    </>
  );
};

export default Form;
