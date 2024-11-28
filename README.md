# React-Node POC

This is a proof-of-concept (POC) application to demonstrate how to integrate React with a Node.js server. The app is built using Webpack and served via Express. It simulates mock API interactions and prepares for further integration with Oracle ATG and other components.

## Project Structure

- **src/**: Contains the React app and its assets.
- **dist/**: The output folder where Webpack bundles the app.
- **server.js**: The Node.js server that serves the app.
- **webpack.config.js**: Configuration for Webpack bundling.
- **package.json**: Defines project dependencies and scripts.

## Prerequisites

- Node.js >= 14
- npm >= 6

## Installation

1. Clone the repository:

   ```
   git clone https://github.com//react-node-poc.git
   cd react-node-poc
   ```


### 2. Install Dependencies
Before building the React app, you need to install the required dependencies. Run the following command:
```bash
npm install
```


### 3. Build the React App for Deployment
To build the React app and copy the output to the JSP server’s `jsp-webapp` folder, run the following command:
```bash
npm run build:deploy
```


This command will:
- Build the React app.
- Copy the build output (JavaScript, CSS, HTML) to the `jsp-webapp` folder.


### 4. Start the JSP Server
Once the build process is complete, you can start the JSP server. This can be done based on your specific server setup. For example, if you're using **Tomcat**, you can start the server by navigating to the `bin` folder inside your Tomcat directory and running:
```bash
./startup.sh  # For Linux/Mac
./startup.bat # For Windows
```


### 5. Access the Application in the Browser
Once the JSP server is running, open your browser and go to:
```
http://localhost:8080/jsp-webapp/
```

This should load your React app integrated within your JSP server.

---

### Additional Notes
- Ensure that your JSP server (e.g., Tomcat) is correctly configured to serve static files like JavaScript and CSS.
- If there are any issues with the file paths or deployment, check the server logs for errors related to missing files or permissions. 