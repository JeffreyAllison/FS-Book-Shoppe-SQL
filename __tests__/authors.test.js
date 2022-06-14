const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors should return a list of authors by id and name', async () => {
    const res = await request(app).get('/authors');
    const authors = await Author.getAllAuthors();
    const expected = authors.map((author) => {
      return {
        id: author.id,
        full_name: author.full_name,
      };
    });
    expect(res.body).toEqual(expected);
  });

  // it('/authors/:id should return an author from the list', async () => {
  //   const res = await request(app).get('/authors/1');
  //   const carl = {
  //     full_name: 'Carl Rossi',
  //     date_of_birth: '1922-03-25',
  //     place_of_birth: 'Arlington, Texas',
  //     id: '1',
  //   };
  //   expect(res.body).toEqual(carl);
  // });

  afterAll(() => {
    pool.end();
  });
});
