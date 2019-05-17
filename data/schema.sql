DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255)   
);



INSERT INTO books (title, author, isbn, image_url, description, bookshelf)
VALUES('Game', 'Paul Geihd', '2453433', 'https://books.google.com/books/content?id=ViH0aZvl510C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Outlines the ways video game designers use math to determine what the audience wants from a game, design characters, map out settings, and create colors.', 'Fiction');


INSERT INTO books (title, author, isbn, image_url, description, bookshelf)
VALUES('Billy and Buddy','Jean Roba', '4598734957','https://books.google.com/books/content?id=aXMryBldmD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'Billy has a very normal life, growing up in a typical family in a nondescript town. His dog, however, is a bit unusual: a cocker spaniel with human–or, as he often reflects himself, superior–intelligence. Buddy’s got his posse of dog pals, his nemesis the neighbour’s cat, and his almost-sister Caroline, the family tortoise. But it is with his best friend Billy that he gets up to the highest mischief, targeting everyone equally with love and abandon.', 'Fiction');