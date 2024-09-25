# Exchange Wiz

#### An application that determines exchange rates for the US dollar for any currency in the world.

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

This application uses the ExchangeRate-API, which contains 161 supported currencies and covers 99% of all UN recognized states and territories. The only currency that is excluded from the list of available currencies is the North Korean Won (KPW). This is due to sanctions and lack of international trade. This application allows users to enter an amount in US dollars (USD), and then select another currency from a drop down menu. Users then select "Convert", and the conversion result will be shown below.

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

None

## Further Exploration

* Figure out how to add currency symbols for every currency in the drop down menu.

## License

MIT

Copyright(c) 2024 Brian Scherner
