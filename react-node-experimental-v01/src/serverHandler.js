

const handler =  () => new Promise((resolve, reject) => {
  
  
  fetch("https://reqres.in/api/users?page=2").then((response) => {
    return response.json();
  }).then((data) => {
    console.log({

      list : data.data
    });
    resolve(data.data);
  }
  ).catch((error) => {
    console.error("Error fetching data:", error);
    reject(error);
  });
} );

module.exports = handler;