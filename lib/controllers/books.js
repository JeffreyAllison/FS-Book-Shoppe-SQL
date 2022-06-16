const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const BookId = await Book.getBookById(id);
    res.json(BookId);
  })
  .get('/', async (req, res) => {
    const Books = await Book.getAllBooks();
    res.json(Books);
  });
