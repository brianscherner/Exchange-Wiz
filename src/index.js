import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

async function getCurrencyConversionRates() {
  let response = await CurrencyService.getCurrencyConversionRates();
  console.log("Response: ", response);
  if (response[0].result === "success") {
    return convertCurrency(response);
  }
}

// function printError(error) {
//   document.querySelector("showCurrencyConversion").innerText = `There was an error accessing the currency data for ${error}: `;
// }

function convertCurrency(response) {
  const convertedEuro = document.querySelector("#usDollars").value * response[0].conversion_rates.EUR;
  const convertedJapaneseYen = document.querySelector("#usDollars").value * response[0].conversion_rates.JPY;
  const convertedSwissFranc = document.querySelector("#usDollars").value * response[0].conversion_rates.CHF;
  const convertedAustralianDollar = document.querySelector("#usDollars").value * response[0].conversion_rates.AUD;
  const convertedHongKongDollar = document.querySelector("#usDollars").value * response[0].conversion_rates.HKD;
  const currencyType = document.querySelector("input[name='currency']:checked").value;
  if (currencyType === "euro") {
    console.log("Converted Euro: ", convertedEuro);
    return convertedEuro;
  } else if (currencyType === "yen") {
    console.log("Converted Yen: ", convertedJapaneseYen);
    return convertedJapaneseYen;
  } else if (currencyType === "franc") {
    console.log("Converted Franc: ", convertedSwissFranc);
    return convertedSwissFranc;
  } else if (currencyType === "australian") {
    console.log("Converted Aussie Dollar: ", convertedAustralianDollar);
    return convertedHongKongDollar;
  } else if (currencyType === "hongKong") {
    console.log("Converted HK dollar: ", convertedHongKongDollar);
    return convertedHongKongDollar;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const usDollars = document.querySelector("#usDollars").value;
  const currencyToConvert = document.querySelector("input[name='currency']:checked").value;
  console.log(usDollars);
  console.log(currencyToConvert);
  getCurrencyConversionRates();
  // convertCurrency(response);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
