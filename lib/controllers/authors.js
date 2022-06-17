const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res) => {
    const Authors = await Author.getAllAuthors();
    res.json(Authors);
  })

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const AuthorId = await Author.getAuthorById(id);
    res.json(AuthorId);
  });
