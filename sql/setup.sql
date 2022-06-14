-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS biblography;

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name VARCHAR,
  date_of_birth INT,
  place_of_birth VARCHAR
);

CREATE TABLE books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  released_date INT
);

CREATE TABLE biblography (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  author_id BIGINT,
  book_id BIGINT,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors (
  full_name,
  date_of_birth,
  place_of_birth
)
VALUES 
('Carl Rossi', 1922-03-25, 'Arlington, Texas'),
('Apple Jack', 1963-10-31, 'Dar es Salaam, Tanzania'),
('Hero Jones', 1947-01-01, 'Bozeman, Montana'),
('Fred Limestone', 1980-06-05, 'El Paso, Texas'),
('Carol Smith', 1899-11-21, 'Clatskanie, Oregon'),
('Apricot Blues', 1950-08-30, 'Bakersfield , California'),
('Calliope Gordon', 1970-04-20, 'Birmingham, Alabama'),
('Hunter Killer', 1920-02-01, 'Richmond , Virginia'),
('Sophia East', 1922-02-22, 'Dover, England');

INSERT INTO books (
  title,
  released_date
)
VALUES 
('A History of Actual Histories', 2000-01-01),
('A Stunning Compilation of Complications', 1974-05-09),
('Write Me Or Fight Me', 2005-07-10),
('Gravity, Time, and Prayer', 1990-02-13),
('Hours Younger', 1957-05-16),
('Go Along With It Without Me', 1989-12-03),
('Plea', 1930-09-18),
('Miles of Roads in Kilometers', 1980-08-02),
('Slumber Games', 1999-12-31),
('Our Last Book', 1977-07-31),
('Stone Guide', 1984-06-11);

-- INSERT INTO biblography (
--   author_id,
--   book_id
-- )

-- VALUES

