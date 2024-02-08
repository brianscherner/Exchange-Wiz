import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

let currencyServiceApiData = null;

async function getCurrencyConversionRates() {
  const response = await CurrencyService.getCurrencyConversionRates();
  currencyServiceApiData = response;
  console.log(currencyServiceApiData);
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
  console.log(currencyConversionRates);

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
  console.log(extractedCurrencyCodeArray);


}

window.addEventListener("load", function() {
  getCurrencyConversionRates();
  // document.querySelector("form").addEventListener("submit", handleFormSubmission);
});

// function convertCurrencyAndDisplayInDom(response) {
//   const americanDollars = document.querySelector("#usDollars").value;
//   const responseArray = [];
//   for (const key in response.conversion_rates) {
//     responseArray.push(`${key}: ${response.conversion_rates[key]}`);
//   }
//   let convertedCurrencyArray = [];
//   responseArray.forEach(function(element) {
//     let conversionRate = parseFloat(element.match(/[\d.]+/));
//     let conversionCode = element.substring(0, 3);
//     let convertedCurrency = americanDollars * conversionRate;
//     convertedCurrencyArray.push(convertedCurrency.toFixed(4) + " " + conversionCode + "\n\n");
//   });
//   document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD is equal to: \n\n ${convertedCurrencyArray.slice(1).join("")}`;
// }

// function handleFormSubmission(event) {
//   event.preventDefault();
//   getCurrencyConversionRates();
// }
