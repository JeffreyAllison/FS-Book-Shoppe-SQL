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
    console.log(res.body, 'body');
    const authors = await Author.getAllAuthors();
    const expected = authors.map((author) => {
      return {
        id: author.id,
        full_name: author.full_name,
      };
    });
    expect(res.body).toEqual(expected);
  });

  // it('should return a list of authors with bibliography', async () => {
  //   const res = await request(app).get('/authors');
  //   expect(res.body.length).toEqual(9);
  //   const carl = res.body.find((auth) => auth.id === 1);
  //   expect(carl).toHaveProperty('id', 1);
  //   expect(carl).toHaveProperty('full_name', 'Carl Rossi');
  //   expect(carl).toHaveProperty('date_of_birth', '1922-03-25');
  //   expect(carl).toHaveProperty('place_of_birth', 'Arlington, Texas');
  // });

  afterAll(() => {
    pool.end();
  });
});
