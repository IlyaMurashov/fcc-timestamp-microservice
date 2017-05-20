'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (_, res) => {
  res.sendFile('index.html');
});

app.get('/:input', (req, res) => {
  const parsedDate = isNaN(parseInt(req.params.input)) ? new Date(req.params.input) : new Date(parseInt(req.params.input));

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});