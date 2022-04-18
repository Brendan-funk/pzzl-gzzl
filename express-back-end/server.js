const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8001;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

//Database Setup
const { Pool } = require("pg");
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
// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
