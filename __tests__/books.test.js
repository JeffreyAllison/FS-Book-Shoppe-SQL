const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

it('/books should return a list of books', async () => {
  const res = await request(app).get('/books');
  const expected = books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      released_date: book.released_date,
    };
  });
  expect(res.body).toEqual(expected);
});
