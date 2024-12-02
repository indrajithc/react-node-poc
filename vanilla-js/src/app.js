// Select the button and message elements
const button = document.getElementById("btn");
const message = document.getElementById("title");

// Add a click event listener to the button
button.addEventListener("click", () => {
  // Update the message when the button is clicked
  message.textContent = "Button was clicked!";
  console.log("Button clicked!"); // Log to the console
});
