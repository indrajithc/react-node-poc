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
   git clone https://github.com/indrajithc/react-node-poc.git
   cd react-node-poc
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Build the React app:

   ```
   npm run build
   ```

4. Start the Node.js server:

   ```
   npm run start
   ```

The app will be available at `http://localhost:3000`.

## Running in Development

To build and start the app in development mode:

1. Run the following command:

   ```
   npm run dev
   ```

This will start the server and automatically rebuild the app on code changes.

## Notes

- The app uses mock data, but this can be replaced with real API endpoints in future stages.
- This setup is designed to be the first step towards integrating React with Oracle ATG and other systems.
