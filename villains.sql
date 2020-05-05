create database villains;

CREATE USER 'villains'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Villain$';

GRANT ALL ON villains.* TO 'villains'@'localhost';

use villains;
CREATE TABLE villains
(
  id INT auto_increment,
    name VARCHAR (255),
    movie VARCHAR (255),
    slug VARCHAR (255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY (id)
);

  INSERT INTO Villains (name, movie, slug) VALUES('Captain Hook', 'Peter Pan', 'captain hook');
  INSERT INTO Villains (name, movie, slug) VALUES('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil');
  INSERT INTO Villains (name, movie, slug) VALUES('Gaston','Beauty and the Beast','gaston');
  INSERT INTO Villains (name, movie, slug) VALUES('Hades','Hercules','hades');
  INSERT INTO Villains (name, movie, slug) VALUES('Horned King', 'The Black Cauldron', 'horned-king');
  INSERT INTO Villains (name, movie, slug) VALUES('Jafar', 'Aladdin', 'jafar');
  INSERT INTO Villains (name, movie, slug) VALUES('Lady Tremaine', 'Cinderella', 'lady-tremaine');
  INSERT INTO Villains (name, movie, slug) VALUES('Madame Medusa', 'The Rescuers', 'madame-medusa');
  INSERT INTO Villains (name, movie, slug) VALUES('Madam Mim', 'The Sword in the Stone', 'madam-mim');
  INSERT INTO Villains (name, movie, slug) VALUES('Maleficent', 'Sleeping Beauty', 'maleficent');
  INSERT INTO Villains (name, movie, slug) VALUES('Prince John', 'Robin Hood', 'prince-john');
  INSERT INTO Villains (name, movie, slug) VALUES('Sir Hiss', 'Robin Hood', 'sir-hiss');
  INSERT INTO Villains (name, movie, slug) VALUES('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde');
  INSERT INTO Villains (name, movie, slug) VALUES('Queen of Hear', 'Alice in Wonderla', 'queen-of-hearts');
  INSERT INTO Villains (name, movie, slug) VALUES('Scar', 'The Lion King', 'scar');
  INSERT INTO Villains (name, movie, slug) VALUES('Shan Yu', 'Mulan', 'shan-yu');
  INSERT INTO Villains (name, movie, slug) VALUES('shere-khan', 'Shere Khan', 'The Jungle Book');
  INSERT INTO Villains (name, movie, slug) VALUES('Ursula', 'The Little Mermaid', 'ursula');