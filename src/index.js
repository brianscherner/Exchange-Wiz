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
  const converteEuroString = convertedEuro.toLocaleString();
  const convertedJapaneseYen = document.querySelector("#usDollars").value * response.conversion_rates.JPY;
  const convertedYenString = convertedJapaneseYen.toLocaleString();
  const convertedSwissFranc = document.querySelector("#usDollars").value * response.conversion_rates.CHF;
  const convertedFrancString = convertedSwissFranc.toLocaleString();
  const convertedAustralianDollar = document.querySelector("#usDollars").value * response.conversion_rates.AUD;
  const convertedAusString = convertedAustralianDollar.toLocaleString();
  const convertedHongKongDollar = document.querySelector("#usDollars").value * response.conversion_rates.HKD;
  const convertedHkString = convertedHongKongDollar.toLocaleString();
  const convertedPoundSterling = document.querySelector("#usDollars").value * response.conversion_rates.GBP;
  const convertedPoundString = convertedPoundSterling.toLocaleString();
  const convertedCanadianDollar = document.querySelector("#usDollars").value * response.conversion_rates.CAD;
  const convertedCanadianString = convertedCanadianDollar.toLocaleString();
  const convertedChineseRenminbi = document.querySelector("#usDollars").value * response.conversion_rates.CNY;
  const convertedRenminbiString = convertedChineseRenminbi.toLocaleString();
  const convertedNewZealandDollar = document.querySelector("#usDollars").value * response.conversion_rates.NZD;
  const convertedNzString = convertedNewZealandDollar.toLocaleString();
  const convertedMexicanPeso = document.querySelector("#usDollars").value * response.conversion_rates.MXN;
  const convertedPesoString = convertedMexicanPeso.toLocaleString();
  const currencyType = document.querySelector("input[name='currency']:checked").value;
  const americanDollars = document.querySelector("#usDollars").value;
  if (currencyType === "euro") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${converteEuroString} Euros.`;
  } else if (currencyType === "yen") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedYenString} Japanese yen.`;
  } else if (currencyType === "franc") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedFrancString} Swiss francs.`;
  } else if (currencyType === "australian") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedAusString} Australian dollars.`;
  } else if (currencyType === "hongKong") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedHkString} Hong Kong dollars.`;
  } else if (currencyType === "pound") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedPoundString} Pounds sterling.`;
  } else if (currencyType === "canadian") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedCanadianString} Canadian dollars.`;
  } else if (currencyType === "chinese") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedRenminbiString} Chinese renminbi.`;
  } else if (currencyType === "newZealand") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedNzString} New Zealand dollars.`;
  } else if (currencyType === "peso") {
    document.querySelector("p#showConvertedCurrency").innerText = `$${americanDollars} USD equals ${convertedPesoString} Mexican pesos.`;
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
