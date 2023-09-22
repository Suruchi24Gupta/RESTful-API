const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/book-api/auth', require('./routes/auth'));
app.use('/book-api/books', require('./routes/book'));

// Start the server
const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*successfully created the app.js file and set up your Express application. 
This file includes code for connecting to the database, adding middleware (CORS and JSON parsing),
defining routes, and starting the server on the specified port. 
You can continue building your application by defining other routes and functionality as needed.*/