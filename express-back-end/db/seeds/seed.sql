INSERT INTO users (name, email, password, rating)
VALUES ('Denda', 'test@gmail.com', 'gunga', 1400),
  ('Elo', 'hello@gmail.com', 'ginga', 1410),
  ('gunga', 'hello@gmail.com', 'ginga', 800), 
  ('ginga', 'hello@gmail.com', 'ginga', 1300),
  ('Keem', 'hello@gmail.com', 'ginga', 900),
  ('Juker', 'hello@gmail.com', 'ginga', 901),
  ('Laof', 'hello@gmail.com', 'ginga', 1222),
  ('Dredge', 'hello@gmail.com', 'ginga', 628),
  ('Jakobe', 'hello@gmail.com', 'ginga', 1350),
  ('Epa', 'hello@gmail.com', 'ginga', 1349),
  ('Erma', 'hello@gmail.com', 'ginga', 1010),
  ('Hunt3r', 'hello@gmail.com', 'ginga', 9),
  ('Knif3Nuk3z', 'hello@gmail.com', 'ginga', 10),
  ('Stobber', 'hello@gmail.com', 'ginga', 212),
  ('Lom', 'hello@gmail.com', 'ginga', 604),
  ('Mo', 'hello@gmail.com', 'ginga', 1400),
  ('Steen', 'hello@gmail.com', 'ginga', 1101),
  ('AggDidIt', 'hello@gmail.com', 'ginga', 101),
  ('Bole_Crandsma', 'hello@gmail.com', 'ginga', 167),
  ('Wagner', 'hello@gmail.com', 'ginga', 1401);
  
INSERT INTO friendships (senderId, recieverId)
VALUES (1,2); 

INSERT INTO puzzles (puzzle_type, date_created, puzzle, answer_key)
VALUES ('Sudoku', '2022-02-24', 'testpuzzle', 'testanswer'), 
  ('Crossword', '2022-02-25', 'testpuzzle', 'testanswer');