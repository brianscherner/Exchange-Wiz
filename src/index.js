import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

async function getCurrencyConversionRates() {
  const response = await CurrencyService.getCurrencyConversionRates();
  console.log("Response: ", response);
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
  const convertedEuro = document.querySelector("#usDollars").value * response.conversion_rates.EUR;
  const convertedJapaneseYen = document.querySelector("#usDollars").value * response.conversion_rates.JPY;
  const convertedSwissFranc = document.querySelector("#usDollars").value * response.conversion_rates.CHF;
  const convertedAustralianDollar = document.querySelector("#usDollars").value * response.conversion_rates.AUD;
  const convertedHongKongDollar = document.querySelector("#usDollars").value * response.conversion_rates.HKD;
  const currencyType = document.querySelector("input[name='currency']:checked").value;
  let americanDollars = document.querySelector("#usDollars").value;
  if (currencyType === "euro") {
    document.querySelector("p#showConvertedCurrency").innerText = `${americanDollars} US Dollars equals ${convertedEuro} Euros.`;
  } else if (currencyType === "yen") {
    document.querySelector("p#showConvertedCurrency").innerText = `${americanDollars} US Dollars equals ${convertedJapaneseYen} Japanese Yen.`;
  } else if (currencyType === "franc") {
    document.querySelector("p#showConvertedCurrency").innerText = `${americanDollars} US Dollars equals ${convertedSwissFranc} Swiss Francs.`;
  } else if (currencyType === "australian") {
    document.querySelector("p#showConvertedCurrency").innerText = `${americanDollars} US Dollars equals ${convertedAustralianDollar} Australian Dollars.`;
  } else if (currencyType === "hongKong") {
    document.querySelector("p#showConvertedCurrency").innerText = `${americanDollars} US Dollars equals ${convertedHongKongDollar} Hong Kong Dollars.`;
  } else {
    document.querySelector("p#showConvertedCurrency").innerText = `Please enter an amount in ${americanDollars}.`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrencyConversionRates();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
