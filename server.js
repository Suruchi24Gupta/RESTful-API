
const mongoose = require('mongoose');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // Importing helmet
require('dotenv').config();

const app = express();
const port = 5000;

// Using helmet middleware for enhanced security
app.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API!');
});

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { dbName: 'books', user: 'suruchi', pass: '24Sg@2001',useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware to parse JSON data in incoming requests


//let books = [];
const Book = require('./book');
app.use(express.json());
// Logic to add or create a new book
/*app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).send('Missing title or author');
    }

    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).send(newBook);
});*/
/*app.post('/books', async (req, res) => {
    let book = new Book({ title: req.body.title, author: req.body.author });
    book = await book.save();
    res.send(book);
});*/
app.post('/books', async (req, res) => {
    try {
        let book = new Book({ title: req.body.title, author: req.body.author });
        book = await book.save();
        res.send(book);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//For getting all books
/*app.get('/books', (req, res) => {
    res.json(books);
});*/
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//For getting a single book
/*app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
});*/
/*app.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
});*/
/*app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.send(book);
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
});*/
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.send(book);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


//For Updating or Modifying a Book’s Details
/*app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }

    const { title, author } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;

    res.send(book);
});*/
app.put('/books/:id', async (req, res) => {
    try {
    const book = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//For Deleting or  Removing a Book
/*app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});*/
/*app.delete('/books/:id', async (req, res) => {
    try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.status(204).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
});*/
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id });
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*//Adding endpoints to my server
// A temporary in-memory "database" until integrating with a real database
let books = [];

// Create a Book
app.post('/books', (req, res) => {
  // Logic to add a book
});

// Get All Books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a Single Book
app.get('/books/:id', (req, res) => {
  // Logic to get a single book
});

// Update a Book
app.put('/books/:id', (req, res) => {
  // Logic to update a book
});

// Delete a Book
app.delete('/books/:id', (req, res) => {
  // Logic to delete a book
});*/