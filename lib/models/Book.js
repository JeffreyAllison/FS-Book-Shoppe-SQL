const pool = require('../utils/pool');
const books = require('../controllers/books');

class Book {
  id;
  title;
  released_date;
  authors;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released_date = row.released_date;
    this.authors = row.authors;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM books');
    return Number(rows[0].count);
  }

  static async insert({ title, released_date }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released_date) VALUES ($1, $2) RETURNING *',
      [title, released_date]
    );
    return new Book(rows[0]);
  }

  static async getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]') as authors 
        FROM books 
        LEFT JOIN biblography on books.id = biblography.book_id
        LEFT JOIN authors on biblography.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }
}
module.exports = Book;
