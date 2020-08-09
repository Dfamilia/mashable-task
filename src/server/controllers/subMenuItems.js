const requestPromise = require('request-promise');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2UwZTMwZTEtOWRkMC00NGU2LWEyNzYtYTgxOGIxN2UxYTgwIiwia2V5X2lkIjoiNDMxNmQxMDgtNjI0Zi00MzU2LThjMDItNGRiMWIzNTI5YmRlIiwiaWF0IjoxNTk2OTU2ODA3fQ.aG0Rn7EcCduggmjIweoYCoWB5cMsm-pB3CHmq3GkLzM';

exports.subMenuItems = async (req, res) => {
  const opts = {
    url: `https://api.list.co.uk/v1/search?query=${req.query.menu}`,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  };
  try {
    const Result = await requestPromise(opts);
    res.send({ result: JSON.parse(Result) });
  } catch (e) {
    console.log('dataError', e);
  }

};
