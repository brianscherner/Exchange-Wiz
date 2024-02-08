import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

let currencyServiceApiData = null;

async function getCurrencyConversionRates() {
  const response = await CurrencyService.getCurrencyConversionRates();
  currencyServiceApiData = response;
  if (response.result === "success") {
    convertCurrencyAndDisplayResult();
  } else {
    printError(response);
  }
}

function printError(error) {
  document.querySelector("p#showConvertedCurrency").innerText = `There was an error accessing currency exchange data: ${error}.`;
}

function convertCurrencyAndDisplayResult() {
  // Get the data from API response.
  let currencyConversionRates = currencyServiceApiData.conversion_rates;

  // Since the "conversion_rates" object has no indexes for any of the currency codes, give each conversion code an index.
  const indexedCurrencyRatesArray = [];
  // This gives each currency code an index.
  for (const key in currencyConversionRates) {
    // It also changes the data to display the currency code and its exchange rate as a string, and pushes each value into the new array
    indexedCurrencyRatesArray.push(`${key}: ${currencyConversionRates[key]}`);
  }

  // Loop through each index in the array that contains the newly formatted currency codes
  let extractedCurrencyCodeArray = [];
  indexedCurrencyRatesArray.forEach(function(element) {
    // since each code is always 3 letters, extract only the letters from the value at each index
    let conversionCode = element.substring(0, 3);
    // push the extracted 3 letter codes into the new array
    extractedCurrencyCodeArray.push(conversionCode);
  });

  // target the drop down list that will display all of the currency codes
  let currencyCodeSelection = document.getElementById("currencyCodeSelection");
  // loop through the array containing all of the 3 letter codes
  for (let i = 1; i < extractedCurrencyCodeArray.length; i++) {
    //for each code, create an element that will contain the value of each index from the array containing the currency codes
    let currencyOption = extractedCurrencyCodeArray[i];
    let currencyElement = document.createElement("option");
    currencyElement.text = currencyOption;
    currencyElement.value = currencyOption;
    // append each element to the drop down list
    currencyCodeSelection.appendChild(currencyElement);
  }
}

window.addEventListener("load", function() {
  getCurrencyConversionRates();
});