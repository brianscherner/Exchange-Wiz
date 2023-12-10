import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

async function getCurrencyConversionRates() {
  const response = await CurrencyService.getCurrencyConversionRates();
  if (response.result === "success") {
    convertCurrencyAndDisplayInDom(response);
  } else {
    printError(response);
  }
}

function printError(error) {
  document.querySelector("p#showConvertedCurrency").innerText = `There was an error accessing currency exchange data: ${error}.`;
}

function convertCurrencyAndDisplayInDom(response) {
  const americanDollars = document.querySelector("#usDollars").value;
  const responseArray = [];
  for (const key in response.conversion_rates) {
    responseArray.push(`${key}: ${response.conversion_rates[key]}`);
  }
  let convertedCurrencyArray = [];
  responseArray.forEach(function(element) {
    let conversionRate = parseFloat(element.match(/[\d.]+/));
    let conversionCode = element.substring(0, 3);
    let convertedCurrency = americanDollars * conversionRate;
    convertedCurrencyArray.push(convertedCurrency + " " + conversionCode + "\n\n");
  });
  document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD is equal to: \n\n ${convertedCurrencyArray.slice(1).join("")}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrencyConversionRates();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
