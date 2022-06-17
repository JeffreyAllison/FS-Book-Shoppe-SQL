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

  it('/authors/:id should return an author from the list', async () => {
    const res = await request(app).get('/authors/1');
    const carl = {
      full_name: 'Carl Rossi',
      date_of_birth: 1922,
      place_of_birth: 'Arlington, Texas',
      id: '1',
      books: [
        {
          id: 10,
          title: 'Our Last Book',
          released_date: 1977,
        },
        {
          id: 2,
          title: 'A Stunning Compilation of Complications',
          released_date: 1974,
        },
      ],
    };
    expect(res.body).toEqual(carl);
  });

  it('POST /authors should create a new author', async () => {
    const author = new Author({
      full_name: 'Lena Hardin',
      date_of_birth: 1979,
      place_of_birth: 'Norman, Oklahoma',
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.body.full_name).toEqual(author.full_name);
    expect(res.body.date_of_birth).toEqual(author.date_of_birth);
    expect(res.body.place_of_birth).toEqual(author.place_of_birth);
    const count = await Author.count();
    expect(count).toEqual(10);
  });

  afterAll(() => {
    pool.end();
  });
});
