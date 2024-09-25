import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { callToServerlessFunction } from './services/serverless-function-call.js';
import { currencyNames } from './services/currency-names.js';

// global variables containing API data and currency names
let currencyServiceApiData = null;
const currencyNamesArray = currencyNames;

async function fetchCurrencyConversionRates() {
  // awaits API response - if call is successful it obtains currency conversion rates and the names of each one

  // if unsuccessful, returns an error
  const response = await callToServerlessFunction();
  currencyServiceApiData = response;
  if (response.result === "success") {
    getCurrencyDataAndAddCurrencyNamesToForm();
  } else {
    printError(response);
  }
}

// function that prints error if API call fails
function printError(error) {
  document.querySelector("p#showConvertedCurrency").innerText = `There was an error accessing currency exchange data: ${error}.`;
}

function getCurrencyDataAndAddCurrencyNamesToForm() {
  // gets conversion rates from API
  let currencyExchangeRates = currencyServiceApiData.conversion_rates;

  // extracts 3 digit currency code for each currency
  const currencyCodes = Object.keys(currencyExchangeRates);
  currencyCodes.splice(128, 1);

  // extracts exchange rate for each currency
  const currencyCodeValues = Object.values(currencyExchangeRates);
  currencyCodeValues.splice(128, 1);

  let currencySelection = document.getElementById("currencySelection");

  // loops through all currency codes and adds the name of each currency next to the 3 digit code

  // dynamically appends each one to the dropdown menu with its name, value, and id
  currencyCodes.forEach((code, index) => {
    const name = currencyNamesArray[index];
    let currency = `${name} (${code})`;
    let currencyElement = document.createElement("option");
    currencyElement.text = currency;
    currencyElement.name = currency;
    currencyElement.value = currencyCodeValues[index];
    currencyElement.id = `${currencyElement.text}`;
    currencySelection.appendChild(currencyElement);
  });

  currencySelection.options[1].style.display = "none";
}

function calculateCurrencyConversion() {
  // gets currency selection and entered value in USD
  let currencySelection = document.getElementById("currencySelection");
  let usDollarAmount = parseFloat(document.getElementById("usDollars").value);
  let selectedCurrencyValue = parseFloat(currencySelection.value);

  // accesses currency name and code and splits code from the name
  let selectedCurrencyName = currencySelection.options[currencySelection.selectedIndex];
  let selectedCurrencyId = selectedCurrencyName.id.split('(');
  let isolatedCurrencyCode = selectedCurrencyId[1].slice(0, 3);

  // calculates the currency conversion
  let currencyConversionResult = parseFloat((usDollarAmount * selectedCurrencyValue).toFixed(4));

  // displays the result
  document.getElementById("showConvertedCurrency").innerText = `${currencyConversionResult.toLocaleString('en-US', { minimumFractionDigits: 4 })} ${isolatedCurrencyCode}`;
}

window.addEventListener("load", function() {
  // loads function that gets API data from the function that calls the serverless function, which calls the API
  fetchCurrencyConversionRates();
  document.getElementById("conversionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("showConvertedCurrency").removeAttribute("class", "hidden");
    calculateCurrencyConversion();
  });
});