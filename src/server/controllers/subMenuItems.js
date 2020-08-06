const requestPromise = require('request-promise');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWVhNGMyYmUtOWUxNy00MjhlLTliY2UtYjk4MGU0MzljYWM1Iiwia2V5X2lkIjoiYjY5MWNkZGUtZTdlZi00MDdjLTgyZTMtM2ViZjUwNjM0MmZiIiwiaWF0IjoxNTk2NjM5OTQwfQ.Ld5-eW0EDmGijHsgVZoSN1DhCmV4h5P1MIu_MDItdgY';

exports.subMenuItems = async (req, res) => {
  console.log('ddfdd', req.query)
  let Result = null;
  const opts = {
    url: `https://api.list.co.uk/v1/search?query=${req.query.menu}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  };
  try {
    // ejecuta el request despues de organizarse los datos
    Result = await requestPromise(opts);

    res.send({ result: JSON.parse(Result) });
  }
  catch (e) {
    console.log('dataError', e);
  }

};
