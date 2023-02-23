# Book-A-Movie-Ticket Fullstack Backend API Project
This is a full-stack project for booking movie tickets, including both the front-end and back-end components. This README file covers the **back-end API component** of the project.
The API provides endpoints for booking movie tickets, viewing last booking. You can access the API using any HTTP client, such as **curl** or **Postman**.

Link to this API - https://bookmyshow-backend-project-production.up.railway.app/

Here are some example requests:

- To view last booking: `GET /api/booking` - https://bookmyshow-backend-project-production.up.railway.app/api/booking
- To book a ticket: `POST /api/booking` - https://bookmyshow-backend-project-production.up.railway.app/api/booking

## Architecture and Design

This project uses the **Express.js** framework for the back-end API and the **MongoDB** database with **Mongoose** **Schemas** for data storage. The API follows **RESTful design principles**.

- The Schema for Movie details can be found in `schema.js`
- From which I import the schema and initiate connection to MongoDB server in the `connector.js`
- Lastly, the server logic with the help of **Express.js** is written in `index.js`

## Testing 

Test cases for schema and express endpoints have been written using **Jest Testing Library** in the `tests` folder.

## Frontend 
Frontend part for this project can be found in the `client` folder. Frontend is built using **ReactJS** library.

## Getting Started 
- To get started with this project, you'll need to have **Node.js** installed on your computer. 
- You need to clone this repository after that

      git clone {this URL}

- You'll also need to install the project's dependencies using the following command:

      npm install

- Once you've installed the dependencies, you can start the server by running the following command:

       npm start

- This will start the server on **port 8080** by default. 

## Demo 
Here's a youtube video link demonstrating how everything works - https://www.youtube.com/watch?v=VTutbP89TjQ&t=20s  
