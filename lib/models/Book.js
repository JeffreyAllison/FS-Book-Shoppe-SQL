const pool = require('../utils/pool');

module.exports = class Book {
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
};
