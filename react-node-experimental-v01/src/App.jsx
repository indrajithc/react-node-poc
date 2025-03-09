import React, { useEffect, useMemo } from "react";

const App = (props) => {
  const [message, setMessage] = React.useState("Hello, World!");

  const id = useMemo(()=> Math.random(),[])

  useEffect(()=>{
setMessage(e => e + "_" + id)
  },[id]);

  return (
    <div>
      <h1>{message}</h1>{
        (props.list||[]).map((item) => (
          <div key={item.id}>
            <p>{item.first_name} {item.last_name}</p>
            <img src={item.avatar} alt={item.first_name} width={272} height={340} />
          </div>
        ))
      }

      <h4>{id}</h4>
      <button  onClick={() => setMessage("Hello, React!")}>Click me!</button>
    </div>
  );
};

export default App;
