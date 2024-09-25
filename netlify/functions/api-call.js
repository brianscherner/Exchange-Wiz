// const fetch = require('node-fetch');
import('node-fetch');
// require('dotenv').config();

exports.handler = async (event, context) => {
  console.log("Fn invoked");
  console.log("Event: ", event);
  console.log("Context: ", context);
  const apiKey = process.env.API_KEY;
  console.log("API key: ", apiKey);
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
