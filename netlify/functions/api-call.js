// makes call to API and returns JSON response object, which is then later called by function from front end in serverless-function-call.js

import('node-fetch');

exports.handler = async () => {
  const apiKey = process.env.API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    });
    const apiData = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiData)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch exchange rate.' }),
    };
  }
}
