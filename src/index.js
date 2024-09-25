import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { callToServerlessFunction } from './services/serverless-function-call.js';
import { currencyNames } from './services/currency-names.js';

async function fetchCurrencyConversionRates() {
  // awaits API response - if call is successful it obtains all currency conversion rates and their names.

  // if unsuccessful, returns an error

  const response = await callToServerlessFunction();
  if (response.result === "success") {
    getCurrencyDataAndAddCurrencyNamesToForm(response.conversion_rates);
  } else {
    printError(response);
  }
}

// function that prints error if API call fails
function printError(error) {
  document.querySelector("p#showConvertedCurrency").innerText = `There was an error accessing currency exchange data: ${error}.`;
}

function getCurrencyDataAndAddCurrencyNamesToForm(apiResponse) {
  // gets conversion rates from API extracts 3 digit currency code for each currency
  const currencyCodes = Object.keys(apiResponse);
  currencyCodes.splice(128, 1);

  // extracts exchange rate for each currency
  const currencyCodeValues = Object.values(apiResponse);
  currencyCodeValues.splice(128, 1);

  // user selects a currency
  let currencySelection = document.getElementById("currencySelection");

  // loops through all currency codes and adds the name of each currency next to the 3 digit code

  // dynamically appends each currency to the dropdown menu with its name, code, value, and an id
  currencyCodes.forEach((code, index) => {
    const name = currencyNames[index];
    let currency = `${name} (${code})`;
    let currencyElement = document.createElement("option");
    currencyElement.text = currency;
    currencyElement.name = currency;
    currencyElement.value = currencyCodeValues[index];
    currencyElement.id = `${currencyElement.text}`;
    currencySelection.appendChild(currencyElement);
  });

  // set base currency (USD) to be invisible, as a user likely won't want or need to compare USD to USD
  currencySelection.options[1].style.display = "none";
}

function calculateCurrencyConversion() {
  // gets currency selection
  let currencySelection = document.getElementById("currencySelection");
  // gets inputted USD amount
  let usDollarAmount = parseFloat(document.getElementById("usDollars").value);
  // gets value of selected currency
  let selectedCurrencyValue = parseFloat(currencySelection.value);

  // accesses currency name and code and splits code from the name
  let selectedCurrencyName = currencySelection.options[currencySelection.selectedIndex];
  let selectedCurrencyId = selectedCurrencyName.id.split('(');
  let isolatedCurrencyCode = selectedCurrencyId[1].slice(0, 3);

  // calculates the currency conversion
  let currencyConversionResult = parseFloat((usDollarAmount * selectedCurrencyValue).toFixed(4));

  // displays the result - the value with the 3 digit code
  document.getElementById("showConvertedCurrency").innerText = `${currencyConversionResult.toLocaleString('en-US', { minimumFractionDigits: 4 })} ${isolatedCurrencyCode}`;
}

window.addEventListener("load", function() {
  // loads function that gets API data from serverless-function-call.js

  // serverless-function-call.js calls Netlify function for API data

  // Netlify function calls ExchangeRate-API for response
  fetchCurrencyConversionRates();
  document.getElementById("conversionForm").addEventListener("submit", function(event) {
    // when form is submitted, the hidden paragraph is revealed with the calculated result
    event.preventDefault();
    document.getElementById("showConvertedCurrency").removeAttribute("class", "hidden");
    calculateCurrencyConversion();
  });
});