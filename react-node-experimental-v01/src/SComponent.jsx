import React from "react";


const getQuotes = async () => {
try {
  const response = await fetch("https://reqres.in/api/users?page=2");
  const data = await response.json();
  return data.data;
} catch (error) {
  return {};
  
}
}
 

const Component = (props) => {

  const [quotes, setQuotes] = React.useState();

  React.useEffect(() => {
    getQuotes().then((data) => {
      setQuotes(data);
    });
  },[]);

 
 
  return (
    <div>
      <div style={{ display: "flex"}}>
      {
      quotes && quotes.map((quote) => {
        return (
          <div key={quote.id}>
            <img src={quote.avatar} alt={quote.first_name} width={16} height={16} />
          </div>
        );
      })
      }
        
      </div>
      {/* {JSON.stringify(quotes)} */}
    some components
    </div> 
  );
};

export default Component;
