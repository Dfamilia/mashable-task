const request = require('request');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjcyOWUxMzMtMzdhYi00OGFkLWFhNTctYjZlZGM5MWFhZmYyIiwia2V5X2lkIjoiYjM3ZjQ2NmYtMjdjNC00ZDYwLWJiZjktOGY4MGY0NGYyN2Q3IiwiaWF0IjoxNTk2MDMzNzgxfQ.0N43TSkqJ1jPObKLseKCT4LAsic_zVwjRF7A8zOZbeY';

exports.subMenuItems = async (req, res) => {
  const opts = {
    url: `https://api.list.co.uk/v1/search?query=${req.query.menu}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  };

  // ejecuta el request despues de organizarse los datos
  request(opts, (err, r, data) => {
    if (err) return;

    res.send({ result: JSON.parse(data) });

    // data: viene en formato string se utiliza JSON.parse
    // JSON.parse(data).forEach((event, i) => {
    //   console.log(event.name);
    // });
  });
};
