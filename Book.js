const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    genre: String,
});

module.exports = mongoose.model('Book', bookSchema);

/*successfully created the models/Book.js file with the book model definition using Mongoose.
This model represents books in your application and includes fields for title, author, description, and genre. 
You can continue building your application and use this model for book-related functionality.*/