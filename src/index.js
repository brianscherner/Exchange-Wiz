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
  const convertedEuro = document.querySelector("#usDollars").value * response.conversion_rates.EUR;
  const convertedJapaneseYen = document.querySelector("#usDollars").value * response.conversion_rates.JPY;
  const convertedSwissFranc = document.querySelector("#usDollars").value * response.conversion_rates.CHF;
  const convertedAustralianDollar = document.querySelector("#usDollars").value * response.conversion_rates.AUD;
  const convertedHongKongDollar = document.querySelector("#usDollars").value * response.conversion_rates.HKD;
  const convertedPoundSterling = document.querySelector("#usDollars").value * response.conversion_rates.GBP;
  const convertedCanadianDollar = document.querySelector("#usDollars").value * response.conversion_rates.CAD;
  const convertedChineseRenminbi = document.querySelector("#usDollars").value * response.conversion_rates.CNY;
  const convertedNewZealandDollar = document.querySelector("#usDollars").value * response.conversion_rates.NZD;
  const convertedMexicanPeso = document.querySelector("#usDollars").value * response.conversion_rates.MXN;
  let currencyType = document.querySelector("input[name='currency']:checked").value;
  let americanDollars = document.querySelector("#usDollars").value;
  if (currencyType === "euro") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedEuro} Euros.`;
  } else if (currencyType === "yen") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedJapaneseYen} Japanese yen.`;
  } else if (currencyType === "franc") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedSwissFranc} Swiss francs.`;
  } else if (currencyType === "australian") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedAustralianDollar} Australian dollars.`;
  } else if (currencyType === "hongKong") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedHongKongDollar} Hong Kong dollars.`;
  } else if (currencyType === "pound") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedPoundSterling} Pounds sterling.`;
  } else if (currencyType === "canadian") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedCanadianDollar} Canadian dollars.`;
  } else if (currencyType === "chinese") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedChineseRenminbi} Chinese renminbi.`;
  } else if (currencyType === "newZealand") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedNewZealandDollar} New Zealand dollars.`;
  } else if (currencyType === "peso") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedMexicanPeso} Mexican pesos.`;
  } else if (currencyType === "won") {
    document.querySelector("p#showConvertedCurrency").innerText = `This currency is not supported due to sanctions and lack of any international trade. Please select a different currency to convert!`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  getCurrencyConversionRates();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
