const express = require('express');
const router = express.Router();

const data = require('./data');
let booksDictionary = data;

router.get('/books', (req, res) => {
    res.send(booksDictionary);
});

router.get('/books/:id', (req, res) => {
    let bookId = req.params.id;
    
    let book = booksDictionary.find(x => x.id == bookId);
    
    if (!book) {
        res.status(404).send("Book not found");
    }
    else {
        res.send(book);
    }
});

router.post('/books', (req, res) => {
    let book = {
        "id": req.body.id,
        "title": req.body.title,
        "description": req.body.description,
        "author": req.body.author
    };

    let existBook = booksDictionary.find(x => x.id == book.id);
    if (existBook) {
        res.send("Book is already exists");
    }
    else {
        booksDictionary.push(book);
        res.send("Add book successfully");
    }
});

router.put('/books/:id', (req, res) => {
    let bookId = req.params.id;

    let newBook = {
        "title": req.body.title,
        "description": req.body.description,
        "author": req.body.author
    };

    let book = booksDictionary.find(x => x.id == bookId);
    if (!book) {
        res.status(404).send("Book not found");
    }
    else {
        book.title = newBook.title;
        book.description = newBook.description;
        book.author = newBook.author;

        res.send("Update book successfully");
    }
});

router.delete('/books/:id', (req, res) => {
    let bookId = req.params.id;
    
    let book = booksDictionary.find(x => x.id == bookId);
    
    if (!book) {
        res.status(404).send("Book not found");
    }
    else {
        booksDictionary = booksDictionary.filter(x => x.id != bookId);
        res.send("Remove book successfully");
    }
});

module.exports = router;