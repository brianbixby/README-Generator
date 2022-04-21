"use strict";

const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

const generateMarkdown = require("./utils/generateMarkdown.js");

const appendFilePromise = util.promisify(fs.appendFile);
const writeFilePromise = util.promisify(fs.writeFile);

const questions = [
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
		// console.log("Success!");
	})
}

async function init() {
	try {
		const { title } = await inquirer.prompt([{ type: 'input', message: 'What is the TITLE of your project?', name: 'title' }]);
		writeFilePromise("README.md", `# ${title}
	  
`);
		const { description, installationInstructions, usageInformation, contributionGuidelines, testInstructions } = await inquirer.prompt(questions);
		appendFilePromise("README.md", `## Description
		
${description}
	
## Installation
	
${installationInstructions}
	
## Usage
	
${usageInformation}
	
## Contributing
	
${contributionGuidelines}
	
## Tests
	
${testInstructions}
	
## Table of Contents
	
${description}
	
## License
	
${description}
	
## Questions
	
${description}
`);
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
	}
}

// Function call to initialize app
init();


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


// fs.writeFile('log.txt', JSON.stringify(response, null, 2), (err) => {
// 	if (err) {
// 		throw (err);
// 	}
// 	console.log('Success!');
// })