const express = require('express');

const app = express();

// MIDDLEWARES//


app.get('/menu-items', (req, res) => {
  res.send('hello world');
});

app.listen(3000, () => console.log('app run on port 3000'));
