const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const navList = [
    'ENTERTAINMENT',
    'CULTURE',
    'TECH',
    'SCIENCE',
    'SOCIAL GOOD',
    'SHOP',
    'MORE'];

  res.send(navList);
});

module.exports = router;
