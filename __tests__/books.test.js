const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    const books = await Book.getAllBooks();
    const expected = books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        released_date: book.released_date,
      };
    });
    expect(res.body).toEqual(expected);
  });

  it('/books/:id should return a book from the list with author information', async () => {
    const res = await request(app).get('/books/1');
    const histories = {
      id: '1',
      title: 'A History of Actual Histories',
      released_date: 2000,
      authors: [
        {
          id: 2,
          full_name: 'Apple Jack',
          date_of_birth: 1963,
          place_of_birth: 'Dar es Salaam, Tanzania',
        },
      ],
    };
    expect(res.body).toEqual(histories);
  });

  afterAll(() => {
    pool.end();
  });
});
