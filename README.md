# Currency Exchanger

#### An application that determines exchange rates for a number of currencies from throughout the world.

#### By Brian Scherner

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager
* ExchangeRate-API
* Git

## Description

This application uses the ExchangeRate-API. It allows users to enter an amount in US dollars (USD), and then select another currency to view it's exchange rate after selecting "Convert Currency". The user will see the exchange rate after submitting the form. If a currency isn't supported by the ExchangeRate-API, the user will see a message explaining so.

## Setup/Installation Requirements

Creating API Key:

* Visit the [ExchangeRate-API](https://www.exchangerate-api.com/) site. Input your email address and click the "Get Free Key" button.
* Create an account with your email, first name, and password. Agree to the terms of use and click "Get Started!".
* You will then be able to view your API key, as well as how many API calls you can make for the current month.

Setup Instructions:

* Select the green "Code" button, clone this repository to your desktop, and open it in VS Code.
* Create a `.env` file and add it to your `.gitignore`.
* Place your API key in your `.env` file and store it in a variable. Example: `API_KEY=a3f4rt56re67th987dd12cc3`.
* **Make sure to commit your `.gitignore` file before moving on.**
* Open a new terminal window, go to the root directory, and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.
* Enter the command `$ npm run lint` to check for errors.

## Known Bugs

Application is functioning as intended, although I plan to add more CSS styling to it later.

## License

MIT

Copyright(c) 2023 Brian Scherner


Increased functionality ideas:

// Option 1: Single input to take code string from user and put in square bracket notation to access conversion rates.

// API call option: Put getCurrencyConversionRates() in the addEventListener and call it once.

// Get user input for single 3 digit code in handleFormSubmission

// When user submits form, get code and use it.

// Store getCurrencyConversionRates function in variable and use as argument in addEventListener for form.

// Asynchronicity will need to factor into this approach.

**Could use a loop to list every currency rate from the API. Save result in a variable, use document.querySelector for 'usDollars' and loop through the response object to display every currency code on screen.**