-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS biblography;

CREATE TABLE authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name VARCHAR,
  date_of_birth INT NOT NULL,
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
('Carl Rossi', 1922, 'Arlington, Texas'),
('Apple Jack', 1963, 'Dar es Salaam, Tanzania'),
('Hero Jones', 1947, 'Bozeman, Montana'),
('Fred Limestone', 1980, 'El Paso, Texas'),
('Carol Smith', 1899, 'Clatskanie, Oregon'),
('Apricot Blues', 1950, 'Bakersfield , California'),
('Calliope Gordon', 1970, 'Birmingham, Alabama'),
('Hunter Killer', 1920, 'Richmond , Virginia'),
('Sophia East', 1922, 'Dover, England');

INSERT INTO books (
  title,
  released_date
)
VALUES 
('A History of Actual Histories', 2000),
('A Stunning Compilation of Complications', 1974),
('Write Me Or Fight Me', 2005),
('Gravity, Time, and Prayer', 1990),
('Hours Younger', 1957),
('Go Along With It Without Me', 1989),
('Plea', 1930),
('Miles of Roads in Kilometers', 1980),
('Slumber Games', 1999),
('Our Last Book', 1977),
('Stone Guide', 1984);

INSERT INTO biblography (
  author_id,
  book_id
)

VALUES
(1, 10),
(1, 2),
(2, 1),
(3, 3),
(4, 9),
(5, 7),
(6, 11),
(7, 4),
(8, 6),
(8, 8),
(9, 10),
(9, 5);

