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
    getCurrencyDataAndAddCurrencyNamesToForm();
  } else {
    printError(response);
  }
}

function printError(error) {
  document.querySelector("p#showConvertedCurrency").innerText = `There was an error accessing currency exchange data: ${error}.`;
}

function getCurrencyDataAndAddCurrencyNamesToForm() {
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
    currencyElement.id = `${currencyElement.text}`;
    currencyCodeSelection.appendChild(currencyElement);
  });
}

function calculateCurrencyConversion() {
  let currencyCodeSelection = document.getElementById("currencyCodeSelection");
  let usDollarValue = document.getElementById("usDollars").value;
  let selectedCurrencyValue = currencyCodeSelection.value;
  let selectedCurrencyName = currencyCodeSelection.options[currencyCodeSelection.selectedIndex];
  let selectedCurrencyId = selectedCurrencyName.id;
  let currencyConversionValue = (usDollarValue * selectedCurrencyValue).toFixed(4);
  document.getElementById("showConvertedCurrency").innerText = `${usDollarValue} US Dollars = \n ${currencyConversionValue} ${selectedCurrencyId}`;
}

window.addEventListener("load", function() {
  getCurrencyConversionRates();
  document.getElementById("conversionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("showConvertedCurrency").removeAttribute("class", "hidden");
    calculateCurrencyConversion();
  });
});