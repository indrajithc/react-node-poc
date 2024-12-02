import React from "react";

const App = (props) => {
  const [message, setMessage] = React.useState("Hello, World!");

  return (
    <div>
      <h1>{message}</h1>{
        props.list.map((item) => (
          <div key={item.id}>
            <p>{item.first_name} {item.last_name}</p>
            <img src={item.avatar} alt={item.first_name} />
          </div>
        ))
      }
      <button onClick={() => setMessage("Hello, React!")}>Click me!</button>
    </div>
  );
};

export default App;
