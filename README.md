# Sample App ReadMe

## Overview

This sample app demonstrates how to integrate Sisense embedded analytics with a React/TypeScript application and automate Jira ticket creation. Follow the instructions below to set up and run the app.

## Prerequisites

- Node.js and npm installed
- A Jira account and project
- Sisense account and API token

## Setup Instructions

1. **Clone the Repository**
   
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**
   
   ```bash
   npm install
   ```

3. **Configure Backend**

   - Change directory to the backend folder:
     
     ```bash
     cd backend
     ```

   - Open `server.js` file and update the Jira credentials:
     
     ```javascript
     const createJiraTicket = async (summary) => {
       const jiraUrl = '<YOUR-JIRA-URL>';
       const jiraAuth = 'Basic ' + Buffer.from('<YOUR-USERNAME:APITOKEN>').toString('base64');
     }
     ```

   - Run the server:
     
     ```bash
     node server.js
     ```

   - Ensure the server is running by checking the console for:
     
     ```
     Listening on port 3000
     ```

4. **Configure Frontend**

   - Back out of the backend directory:
     
     ```bash
     cd ..
     ```

   - Open `src/index.tsx` file and update the Sisense context provider with your Sisense information:
     
     ```typescript
     <SisenseContextProvider url={'https://YOUR-SERVER-URL.com'} token={'YOUR-API-TOKEN'}>
       <AiContextProvider>
         <App />
       </AiContextProvider>
     </SisenseContextProvider>
     ```

5. **Start the Application**

   - Run the application:
     
     ```bash
     npm start
     ```

   - Open your browser and refresh the page. The query will re-run, and you should see a new ticket in your Jira project.

## Conclusion

By following these steps, you have set up a sample app that integrates Sisense embedded analytics with a React/TypeScript application and automates Jira ticket creation. If you encounter any issues, please refer to the documentation or contact support.

---

Enjoy your new app!
