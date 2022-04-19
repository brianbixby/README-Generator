"use strict";

// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
	{
		type: 'input',
		message: 'What is the TITLE of your project?',
		name: 'title',
		when(answers) {
			writeToFile("README-test.md", `# ${answers.title}`);
		},
	},
	{
		type: 'input',
		message: 'Please DESCRIBE your project.',
		name: 'description'
	},
	{
		type: 'input',
		message: 'Please include any INSTALLATION INSTRUCTIONS for your project.',
		name: 'installationInstructions'
	},
	{
		type: 'input',
		message: 'Please include any USAGE INFORMATION for your project.',
		name: 'usageInformation'
	},
	{
		type: 'input',
		message: 'Please include any CONTRIBUTION GUIDELINES for your project.',
		name: 'contributionGuidelines'
	},
	{
		type: 'input',
		message: 'Please include any TEST INSTRUCTIONS for your project.',
		name: 'testInstructions'
	}
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	fs.appendFile(fileName, data, err => {
		if (err) {
			throw (err);
		}
		console.log("Success!");
	})
}

// TODO: Create a function to initialize app
function init() {
	inquirer
		.prompt(questions)
		.then(data => {
			writeToFile("README-test.md", generateMarkdown(data));
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
			} else {
				// Something else went wrong
			}
		});



	// {
	// 	type: 'checkbox',
	// 	message: 'Select toppings',
	// 	name: 'toppings',
	// 	choices: [
	// 	  new inquirer.Separator(' = The Meats = '),
	// 	  {
	// 		name: 'Pepperoni',
	// 	  },
	// 	  {
	// 		name: 'Ham',
	// 	  },
	// 	  {
	// 		name: 'Ground Meat',
	// 	  },
	// 	  {
	// 		name: 'Bacon',
	// 	  },
	// 	  new inquirer.Separator(' = The Cheeses = '),
	// 	  {
	// 		name: 'Mozzarella',
	// 		checked: true,
	// 	  },
	// 	  {
	// 		name: 'Cheddar',
	// 	  },
	// 	  {
	// 		name: 'Parmesan',
	// 	  },
	// 	  new inquirer.Separator(' = The usual ='),
	// 	  {
	// 		name: 'Mushroom',
	// 	  },
	// 	  {
	// 		name: 'Tomato',
	// 	  },
	// 	  new inquirer.Separator(' = The extras = '),
	// 	  {
	// 		name: 'Pineapple',
	// 	  },
	// 	  {
	// 		name: 'Olives',
	// 		disabled: 'out of stock',
	// 	  },
	// 	  {
	// 		name: 'Extra cheese',
	// 	  },
	// 	],
	// 	validate(answer) {
	// 	  if (answer.length < 1) {
	// 		return 'You must choose at least one topping.';
	// 	  }

	// 	  return true;
	// 	},
	//   }
}

// Function call to initialize app
init();


// fs.writeFile('log.txt', JSON.stringify(response, null, 2), (err) => {
// 	if (err) {
// 		throw (err);
// 	}
// 	console.log('Success!');
// })