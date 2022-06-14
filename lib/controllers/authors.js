const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().get('/', async (req, res) => {
  const Authors = await Author.getAllAuthors();
  res.json(Authors);
});
