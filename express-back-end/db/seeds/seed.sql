INSERT INTO users (name, email, password, rating)
VALUES ('Denda', 'test@gmail.com', 'gunga', 1500),
  ('Elo', 'hello@gmail.com', 'ginga', 1400); 
  
INSERT INTO friendships (senderId, recieverId)
VALUES (1,2); 

INSERT INTO puzzles (puzzle_type, date_created, puzzle, answer_key)
VALUES ('Sudoku', '2022-02-24', 'testpuzzle', 'testanswer'), 
  ('Crossword', '2022-02-25', 'testpuzzle', 'testanswer');