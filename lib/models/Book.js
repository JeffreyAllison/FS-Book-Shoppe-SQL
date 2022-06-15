const pool = require('../utils/pool');
const books = require('../controllers/books');

class Book {
  id;
  title;
  released_date;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released_date = row.released_date;
  }

  static async getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }
}
module.exports = Book;
