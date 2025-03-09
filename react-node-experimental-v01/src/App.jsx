import React, { useEffect, useMemo, Suspense } from "react";
// import Component from "./Component";

const Component = React.lazy(() => import("./Component"));

const App = (props) => {
  const [message, setMessage] = React.useState("Hello, World!");

  const [enableComponent, setEnableComponent] = React.useState(false);


  const id = useMemo(() => Math.random(), []);

  useEffect(() => {
    setMessage((e) => e + "_" + id);
  }, [id]);

  return (
    <div>
      <button onClick={() => setEnableComponent(true)}>Enable Component</button>
      {
        enableComponent && <Suspense fallback={<div>Loading...</div>}>
          <Component />
        </Suspense>
      }
        
      <br></br>
      <h1>{message}</h1>
      {(props.list || []).map((item) => (
        <div key={item.id}>
          <p>
            {item.first_name} {item.last_name}
          </p>
          <img
            src={item.avatar}
            alt={item.first_name}
            width={272}
            height={340}
          />
        </div>
      ))}

      <h4>{id}</h4>
      <button onClick={() => setMessage("Hello, React!")}>Click me!</button>
    </div>
  );
};

export default App;
