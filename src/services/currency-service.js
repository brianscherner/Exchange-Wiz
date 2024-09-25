// calls API and returns JSON response object

export const getCurrencyConversionRates = async () => {
  const apiCall = "/.netlify/functions/api-call";
  try {
    const fetchedApiData = await fetch(apiCall);
    const apiDataJson = await fetchedApiData.json();
    const currencyConversionRates = apiDataJson;
    return currencyConversionRates;
  } catch (error) {
    return error;
  }
}

// export default class CurrencyService {
//   static async getCurrencyConversionRates() {
//     try {
//       const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
//       const jsonifiedResponse = await response.json();
//       if (!response.ok) {
//         const errorMessage = `${response.status} ${jsonifiedResponse["error-type"]}`;
//         throw new Error(errorMessage);
//       }
//       return jsonifiedResponse;
//     } catch(error) {
//       return error;
//     }
//   }
// }