import officegen from 'officegen';
import path from 'path';

import testWordBasic from './tests/word-basic';
import testExcelBasic from './tests/excel-basic';
import testPowerPointBasic from './tests/powerPoint-basic';

const tests = [
	{ name: 'Word - basic', harness: testWordBasic },
	{ name: 'Excel - basic', harness: testExcelBasic },
	{ name: 'PowerPoint - basic', harness: testPowerPointBasic },
];

async function test() {
	console.log('Running Office tests…\n');

	const results = [];
	for (const { name, harness } of tests) {
		console.log(`Running ${name}…\n`);
		try {
			await harness();
			results.push({ name });
		} catch (error) {
			results.push({ name, error });
		}
	}

	for (const result of results) {
		if (result.error) {
			console.log(`'${result.name}' failed with an error.`, result.error);
		} else {
			console.log(`'${result.name}' succeeded.`);
		}
	}
}

test();
