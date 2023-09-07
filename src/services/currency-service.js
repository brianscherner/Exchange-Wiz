export default class CurrencyService {
  static async getCurrencyConversionRates() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      console.log(response);
      const jsonifiedResponse = await response.json();
      console.log(jsonifiedResponse);
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.type} ${jsonifiedResponse["error-type"]}`;
        console.log(errorMessage);
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}