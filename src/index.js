import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './services/currency-service.js';

async function getConvertedCurrency(currencyType) {
  let response = await CurrencyService.getConvertedCurrency(currencyType);
  console.log("response: ", response);
  console.log(response[0].conversion_rates.EUR);
  console.log(response[0].conversion_rates.JPY);
  console.log(response[0].conversion_rates.CHF);
  console.log(response[0].conversion_rates.AUD);
  console.log(response[0].conversion_rates.HKD);
  const convertedEuro = document.querySelector("#usDollars").value * response[0].conversion_rates.EUR;
  const convertedJapaneseYen = document.querySelector("#usDollars").value * response[0].conversion_rates.JPY;
  const convertedSwissFranc = document.querySelector("#usDollars").value * response[0].conversion_rates.CHF;
  const convertedAustralianDollar = document.querySelector("#usDollars").value * response[0].conversion_rates.AUD;
  const convertedHongKongDollar = document.querySelector("#usDollars").value * response[0].conversion_rates.HKD;
  console.log("Converted currencies: ", convertedEuro);
  console.log("Converted currencies: ", convertedJapaneseYen);
  console.log("Converted currencies: ", convertedSwissFranc);
  console.log("Converted currencies: ", convertedAustralianDollar);
  console.log("Converted currencies: ", convertedHongKongDollar);
  if (currencyType === "euro") {
    return convertedEuro;
  } else if (currencyType === "yen") {
    return convertedJapaneseYen;
  } else if (currencyType === "franc") {
    return convertedSwissFranc;
  } else if (currencyType === "australian") {
    return convertedAustralianDollar;
  } else if (currencyType === "hongKong") {
    return convertedHongKongDollar;
  } else {
    // printError(response);
  }
}

// function printError(error) {
//   document.querySelector("showCurrencyConversion").innerText = `There was an error accessing the currency data for ${error}: `;
// }

// function printCurrencyConversion() {

// }

function handleFormSubmission(event) {
  event.preventDefault();
  const usDollars = document.querySelector("#usDollars").value;
  const currencyToConvert = document.querySelector("input[name='currency']:checked").value;
  console.log(usDollars);
  console.log(currencyToConvert);
  getConvertedCurrency();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});
