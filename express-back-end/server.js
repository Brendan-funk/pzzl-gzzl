const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8001;
const testRoutes = require('./routes/sudoku');
const cors = require('cors');
const schedule = require('node-schedule');
const LocalDate = require('js-joda').LocalDate;
// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(
  cors({
    origin: "*",
  })
)
//Database Setup
const { Pool } = require("pg");
const bodyParser = require('body-parser');
const { generatePuzzle } = require('./helpers');
const { LocalDateTime } = require('js-joda');
const db = new Pool( {
  host: 'localhost',
  port: 5432,
  user: 'final_dev',
  password: 'final_dev',
  database: 'final_db'
})

db.connect()
.then(res => console.log('database connected'))
.catch(err => console.log(err));

schedule.scheduleJob('0 0 * * *', () => {
  DateTimeFormatter.ofPattern("yyyy--MM-dd");
  dailyPzzl = generatePuzzle();
  const pzzlString = JSON.stringify(dailyPzzl.puzzle);
  const answerString = JSON.stringify(dailyPzzl.solution);
  db.query(`INSERT INTO puzzles (puzzle_type, date_created, puzzle, answer_key)
            VALUES ('Sudoku', ${LocalDate.now().format(formatter).toString()}, ${pzzlString}, ${answerString});`)
  .then(console.log('done'));
});
// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));
App.use("/sudoku", testRoutes('ginga'));

App.post('/rating', (req, res) => {
  let tempRating = 0;
  let bodyObj = req.body;
  const ratingChange = bodyObj.ratingChange;
  const userId = bodyObj.id;
  db.query(`SELECT rating FROM users WHERE id = $1`, [userId])
  .then(temp_rating => {
    console.log(temp_rating.rows[0].rating);
    tempRating = temp_rating.rows[0].rating;
    newRating = tempRating + ratingChange;
    db.query(`UPDATE users
      SET rating = $1
      WHERE id = $2`, [newRating, userId])
  });
});
App.get('/rating', (req,res) => {
  console.log('works');
})
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

