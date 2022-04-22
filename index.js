"use strict";

const fs = require("fs");
const util = require("util");

const inquirer = require("inquirer");

const generateMarkdown = require("./utils/generateMarkdown.js");

const questions = [
	{
		type: 'input',
		message: 'What is the TITLE of your project?',
		name: 'title'
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
	},
	{
		type: 'list',
		message: 'Please select a LICENSE for this project.',
		name: 'license',
		choices: ['Apache License 2.0', 'GNU GPLv3', 'ISC', 'MIT', 'None'],
	},
	{
		type: 'input',
		message: 'Please enter your GITHUB USERNAME.',
		name: 'github'
	},
	{
		type: 'input',
		message: 'Please enter your EMAIL ADDRESS.',
		name: 'email'
	}
];

async function writeToFile(fileName, data) {
	try {
		const writeFilePromise = util.promisify(fs.writeFile)
		await writeFilePromise(fileName, data);
	}
	catch (err) {
		console.log("Write File Error");
		return err;
	}
}

async function init() {
	try {
		const data = await inquirer.prompt(questions);
		const markdown = generateMarkdown(data);
		await writeToFile("./dist/README.md", markdown);
	}
	catch (err) {
		if (err.isTtyError) console.log("Prompt couldn't be rendered in the current environment");
		else console.log(err);
	}
}

// Function call to initialize app
init();