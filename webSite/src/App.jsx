import React from "react";

const App = () => {
  return (
    <>
      <form
        className="flex flex-col gap-8 h-screen w-screen items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(
            "name = " + e.target[0].value,
            "password = " + e.target[1].value,
          );
        }}
      >
        <input type="text" placeholder="Enter Your Name" />
        <input type="password" placeholder="Enter Your Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default App;
