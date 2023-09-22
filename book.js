const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Book = require('../models/Book');

// @route   GET /api/books
// @desc    Get all books
// @access  Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/books
// @desc    Add a book
// @access  Private
router.post(
    '/',
    [verifyToken, [check('title', 'Title is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const { title, author, description, genre } = req.body;
            
            const newBook = new Book({
                title,
                author,
                description,
                genre,
            });
            
            const book = await newBook.save();
            
            res.json(book);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, author, description, genre } = req.body;
    // Build book object
    const bookFields = {};
    if (title) bookFields.title = title;
    if (author) bookFields.author = author;
    if (description) bookFields.description = description;
    if (genre) bookFields.genre = genre;
    
    try {
        let book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).json({ message: 'Book not found' });
        
        // Make sure the user owns the book
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: bookFields },
            { new: true }
            );
            
            res.json(book);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).json({ message: 'Book not found' });
        
        // Make sure the user owns the book
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await Book.findByIdAndRemove(req.params.id);
        
        res.json({ message: 'Book removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

/*This step is essential because it defines the routes for managing books in your API,
including routes for getting all books, adding a new book, updating a book, and deleting a book. 
The routes are protected with the `verifyToken*/