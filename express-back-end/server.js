const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const cors = require('cors');

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(
  cors({
    origin: "*",
  })
);

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

App.get('/', (req, res) => {
  res.send('Hello World!')
})

App.post('/rating', (req, res) => {
  let tempRating = 0;
  let bodyObj = req.body;
  console.log(bodyObj);
  const ratingChange = bodyObj.ratingChange;
  const userId = bodyObj.id;
  db.query(`SELECT rating FROM users WHERE id = $1`, [userId])
  .then(temp_rating => {
    console.log('HERE');
    tempRating = temp_rating.rows[0].rating;
    newRating = tempRating + ratingChange;
    db.query(`UPDATE users
      SET rating = $1
      WHERE id = $2`, [newRating, userId])
      res.end(JSON.stringify(newRating));
  })
});

App.get('/leaderboard', (req, res) => {
  db.query(`SELECT name, rating FROM users
            ORDER BY rating DESC
            LIMIT 20` )
  .then(leaderboard => {
    res.json(leaderboard.rows);
  })
})
App.get('/:id/rating', (req,res) => {
  
  db.query('SELECT rating FROM users WHERE id = $1;', [req.params.id])
  .then(rating => {
    console.log(rating.rows);
    res.json(rating.rows);
  })
})
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

