const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router().get('/', async (req, res) => {
  const Books = await Book.getAllBooks();
  res.json(Books);
});
