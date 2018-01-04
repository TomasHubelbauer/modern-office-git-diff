import officegen from 'officegen';
import path from 'path';

import testWordBasic from './tests/word-basic';
import testExcelBasic from './tests/excel-basic';
import testPowerPointBasic from './tests/powerPoint-basic';
import testSkipUnchanged from './tests/skip-unchanged';
import testVerifyGeneratedWarnings from './tests/verify-generated-warnings';
import testDisposeAbandoned from './tests/dispose-abandoned';
import testVerifyPreCommitHook from './tests/verify-pre-commit-hook';

const tests = [
	{ name: 'Word - basic', harness: testWordBasic },
	{ name: 'Excel - basic', harness: testExcelBasic },
	{ name: 'PowerPoint - basic', harness: testPowerPointBasic },
	{ name: 'Skip unchanged', harness: testSkipUnchanged },
	{ name: 'Verify generated warnings', harness: testVerifyGeneratedWarnings },
	{ name: 'Dispose abandoned', harness: testDisposeAbandoned },
	{ name: 'Verify pre-commit hook', harness: testVerifyPreCommitHook },
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
