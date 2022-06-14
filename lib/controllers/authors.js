const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const Authors = await Author.getAllAuthors();
    res.json(Authors);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const AuthorId = await Author.getAuthorById(id);
    res.json(AuthorId);
  });
