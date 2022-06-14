const authors = require('../controllers/authors');
// const bibliographies = require ('../controllers/bibliographies');
const pool = require('../utils/pool');
// const { Biblography } = require ('./Biblography');

class Author {
  id;
  full_name;
  date_of_birth;
  place_of_birth;
  // bibliographies;

  constructor(row) {
    this.id = row.id;
    this.full_name = row.full_name;
    this.date_of_birth = row.date_of_birth;
    this.place_of_birth = row.place_of_birth;
    // this.bibliographies =
  }

  static async getAllAuthors() {
    const { rows } = await pool.query('SELECT id, full_name FROM authors;');
    return rows.map((row) => new Author(row));
  }
}
module.exports = Author;
