
import { h } from "preact";
import { useState, useCallback } from "preact/hooks";

function Counter() {
  const [value, setValue] = useState(0);
  const increment = useCallback(() => {
    setValue(value + 1);
  }, [value]);

  return (
    <div>
      <p>Counter: {value}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}


export default Counter;