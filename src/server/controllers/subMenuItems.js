const request = require('request');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDAzYmE1NmUtODI5MS00YzgzLTgwMTUtNGYzODgwOWRmMmE4Iiwia2V5X2lkIjoiNWI1ZjUxMjQtNGMxMS00YTdlLTkzNDktYmY4ODA5YmE1NjkzIiwiaWF0IjoxNTk2MzE3NDA0fQ.qiN6_BMaMrpxF214cEFItNkBOljT6UMrqwxn3hSA6CA';

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
  });
};
