//creating a schema model for books.
// This code defines a simple schema with title and author and creates a model.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true }, 
    author: { type: String, required: true } 
});
//If I try to create a book without a title or author, Mongoose will throw an error
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;