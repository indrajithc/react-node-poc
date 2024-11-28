import React from "react";

const App = () => {
  const [message, setMessage] = React.useState("Hello, World!");

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("Hello, React!")}>Click me!</button>
    </div>
  );
};

export default App;
