import React, { useEffect, useMemo } from "react";

const Component = (props) => {
  const [message, setMessage] = React.useState("Your Hello, World!");

  const id = useMemo(()=> Math.random(),[])

  useEffect(()=>{
setMessage(e => e + "_" + id)
  },[id]);

  return (
    <div>
      <h1>{message}</h1> 
      <h4>{id}</h4>
      <button  onClick={() => setMessage("Your Hello, React!")}>You Click me!</button>
    </div>
  );
};

export default Component;
