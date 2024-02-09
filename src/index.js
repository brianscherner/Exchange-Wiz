import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';
import { currencyNames } from './services/currency-names.js';

let currencyServiceApiData = null;
const currencyNamesArray = currencyNames;

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
  let currencyConversionRates = currencyServiceApiData.conversion_rates;

  const currencyCodes = Object.keys(currencyConversionRates);
  currencyCodes.splice(128, 1);

  const currencyCodeValues = Object.values(currencyConversionRates);
  currencyCodeValues.splice(128, 1);

  let currencyCodeSelection = document.getElementById("currencyCodeSelection");

  currencyCodes.forEach((code, index) => {
    const name = currencyNamesArray[index];
    let currency = `${code} - ${name}`;
    let currencyElement = document.createElement("option");
    currencyElement.text = currency;
    currencyElement.name = currency;
    currencyElement.value = currencyCodeValues[index];
    currencyCodeSelection.appendChild(currencyElement);
  });

}

window.addEventListener("load", function() {
  getCurrencyConversionRates();
});