<h1 align="center">Pzzl Gzzl</h1>

# Summary
A ranked puzzle application that allows users to complete daily challenges for ranked points. A practice mode that does not track score is also avaliable for users to play. The current implemented puzzle is sudoku, with more puzzles coming soon!

## Features
- Interactive 3D menu
  - Start a new puzzle from the menu screen
  - Use the arrow keys to switch to casual puzzle mode
- New puzzle every 24 hours
  - Compete with others for the daily puzzle high score every 24 hours
- Global Leaderboard
  - View the leaderboard to see the top puzzle players

## Screenshots
![Home Page](https://github.com/ethanloewen/pzzl-gzzl/blob/main/documents/pzzl_main.png?raw=true)

![Ranked Puzzle](https://github.com/ethanloewen/pzzl-gzzl/blob/main/documents/pzzl_sudoku_ranked.png?raw=true)

![Puzzle Complete](https://github.com/ethanloewen/pzzl-gzzl/blob/main/documents/pzzl_win.png?raw=true)

![Casual Puzzle](https://github.com/ethanloewen/pzzl-gzzl/blob/main/documents/pzzl_casual.png?raw=true)

## **Client**
```sh
cd react-front-end
```

### Setup

Install dependencies with

```sh
npm install
```

### Running Development Server

```sh
npm start
```

## Client Dependencies
- @emotion/react
- @emotion/styled
- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome
- @mui/material
- axios
- classnames
- node-sass
- react
- react-dom
- react-scripts
- sudoku

## **Server**

```sh
cd express-back-end
```

### API Setup

Install dependencies with

```sh
npm install
```

### Running Database Server

```sh
npm start
```

### Database Reset

Resets, and seeds the database for development/testing.

```sh
npm run db-reset
```

## Server Dependencies
- body-parser
- cors
- cron
- express
- js-joda
- node-schedule
- nodemon
- pg
- sudoku