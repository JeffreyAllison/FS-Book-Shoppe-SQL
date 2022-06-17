const authors = require('../controllers/authors');
const pool = require('../utils/pool');

class Author {
  id;
  full_name;
  date_of_birth;
  place_of_birth;
  books;

  constructor(row) {
    this.id = row.id;
    this.full_name = row.full_name;
    this.date_of_birth = row.date_of_birth;
    this.place_of_birth = row.place_of_birth;
    this.books = row.books;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM authors');
    return Number(rows[0].count);
  }

  static async insert({ full_name, date_of_birth, place_of_birth }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (full_name, date_of_birth, place_of_birth) VALUES ($1, $2, $3) RETURNING *',
      [full_name, date_of_birth, place_of_birth]
    );
    return new Author(rows[0]);
  }

  static async getAllAuthors() {
    const { rows } = await pool.query('SELECT id, full_name FROM authors;');
    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `SELECT 
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books.id IS NOT NULL), '[]') as books
      FROM authors 
      LEFT JOIN biblography on authors.id = biblography.author_id
      LEFT JOIN books on biblography.book_id = books.id
      WHERE authors.id = $1
      GROUP BY authors.id`,
      [id]
    );
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
}
module.exports = Author;
