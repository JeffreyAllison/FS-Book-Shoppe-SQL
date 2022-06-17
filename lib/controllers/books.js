const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const BookId = await Book.getBookById(id);
    res.json(BookId);
  })
  .get('/', async (req, res) => {
    const Books = await Book.getAllBooks();
    res.json(Books);
  });
