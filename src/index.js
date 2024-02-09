import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';
import { currencyNames } from './services/currency-names.js';

let currencyServiceApiData = null;
const currencyNamesArray = currencyNames;
console.log(currencyNamesArray);

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
  console.log(currencyConversionRates);

  const currencyCodes = Object.keys(currencyConversionRates);
  console.log(currencyCodes);
  currencyCodes.splice(128, 1);
  console.log(currencyCodes);
  const currencyCodeValues = Object.values(currencyConversionRates);
  console.log(currencyCodeValues);

  currencyCodes.forEach((code, index) => {
    const name = currencyNamesArray[index];
    console.log(code, name);
  });

}

window.addEventListener("load", function() {
  getCurrencyConversionRates();
});

// Since the "conversion_rates" object has no indexes for any of the currency codes, give each conversion code an index.
// const indexedCurrencyRatesArray = [];
// // This gives each currency code an index.
// for (const key in currencyConversionRates) {
//   // It also changes the data to display the currency code and its exchange rate as a string, and pushes each value into the new array
//   indexedCurrencyRatesArray.push(`${key}: ${currencyConversionRates[key]}`);
// }
// console.log(indexedCurrencyRatesArray);

// Loop through each index in the array that contains the newly formatted currency codes
// let extractedCurrencyCodeArray = [];
// let exchangeRateValueArray = [];
// indexedCurrencyRatesArray.forEach(function(element) {
//   // extract the decimal number from each index
//   let conversionCodeNumber = element.replace(/[^0-9.]+/g, "");
//   // extract the 3 letter code from each index
//   let conversionCode = element.substring(0, 3);
//   // push the extracted decimal number into a new array
//   exchangeRateValueArray.push(conversionCodeNumber);
//   // push the extracted 3 letter codes into a new array
//   extractedCurrencyCodeArray.push(conversionCode);
// });
// console.log(exchangeRateValueArray);
// console.log(extractedCurrencyCodeArray);
// exchangeRateValueArray.shift(1);
// extractedCurrencyCodeArray.shift(1);
// console.log(exchangeRateValueArray);
// console.log(extractedCurrencyCodeArray);
// console.log(currencyNamesArray);

// target the drop down list that will display all of the currency codes
// let currencyCodeSelection = document.getElementById("currencyCodeSelection");
// loop through the array containing all of the 3 letter codes
// extractedCurrencyCodeArray.forEach((code, index) => {
//   const name = currencyNamesArray[index];
//   console.log(code, name);
// });

// for (let i = 0; i < extractedCurrencyCodeArray.length; i++) {
//   //for each code, create an element that will contain the value of each index from the array containing the currency codes
//   let currencyCode = extractedCurrencyCodeArray[i];
//   let currencyElement = document.createElement("option");
//   currencyElement.text = currencyCode;
//   currencyElement.value = currencyCode;
//   // append each element to the drop down list
//   currencyCodeSelection.appendChild(currencyElement);
// }

// for (let i = 0; i < currencyNamesArray.length; i++) {
//   let currencyName = currencyNamesArray[i];
//   console.log(currencyName);
//   currencyElement.text = currencyName;
//   console.log(currencyElement);
//   currencyCodeSelection.appendChild(currencyElement);
// }