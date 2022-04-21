
const express = require('express');
const { formatGuess } = require('../helpers');
const App = express();
const router = express.Router();

module.exports = (gunga) => {
  router.post('/', (req,res) => {
    const answers = req.body;
    formatGuess()
    console.log(req);
  });

  return router;
};