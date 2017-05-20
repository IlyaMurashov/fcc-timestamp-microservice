'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, res) => {
  res.sendFile('index.html');
});

app.get('/:input', (req, res) => {
  const parsedDate = new Date(req.params.input);

  if (isNaN(parsedDate.getTime())) {
    res.status(400).end("Sorry, it seems like the string you queried couldn't be parsed. Check API docs for examples.");
  }
  else {
    res.json({
      unix: parsedDate.getTime(),
      natural: parsedDate.toDateString()
    });
  }
});

app.listen(8080, _ => {
  console.log('Listening on port 8080');
});