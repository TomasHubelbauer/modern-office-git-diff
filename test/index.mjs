import officegen from 'officegen';
import fs from 'fs';
import os from 'os';
import path from 'path';
import child_process from 'child_process';
import util from 'util';

import testWordBasic from './tests/word-basic';
import testExcelBasic from './tests/excel-basic';

const mkdtemp = util.promisify(fs.mkdtemp);
const exec = util.promisify(child_process.exec);

async function test() {
	console.log('Running Office tests…\n');
	await run(testWordBasic, 'docx', 'Word - basic');
	await run(testExcelBasic, 'xlsx', 'Excel - basic');
	// TODO: Add more tests.
}

test();

// Change to decorator once supported in NodeJS
async function run(harness, type, name) {
	console.log('Test:' + name);
	const office = officegen({ type });
	let test;

	const temporaryDirectoryPath = await mkdtemp(path.join(os.tmpdir(), 'modern-office-diff-git'));
	const officeFilePath = path.join(temporaryDirectoryPath, 'office.' + type);
	const scriptFilePath = path.join(process.cwd(), '../cmd/version-office-files.ps1');

	// Populate the Office file.
	try {
		test = harness(office);
	} catch (error) {
		console.log('Failed to constuct the Office file.', error);
	}

	// Initialize a Git repository.
	try {
		const { stdout, stderr } = await exec(`git init`, { cwd: temporaryDirectoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log('Failed to initialize a Git repository.', error);
	}

	// Generate the Office file and stage it for `git diff`.
	try {
		const promise = new Promise((resolve, reject) => {
			office.on('finalize', resolve);
			office.on('error', reject);
		});

		office.generate(fs.createWriteStream(officeFilePath));
		await promise;
	} catch (error) {
		console.log('Failed to generate the Office file.', error);
	}

	// Stage the Office file.
	try {
		const { stdout, stderr } = await exec(`git add "${officeFilePath}"`, { cwd: temporaryDirectoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log('Failed to stage the Office file.', error);
	}

	// Execute the PowerShell script.
	try {
		const { stdout, stderr } = await exec(`powershell ${scriptFilePath}`, { cwd: temporaryDirectoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log('Failed to execute the Office script.', error);
	}


	console.log(`Testing ${officeFilePath}…`);
	try {
		test(path.join(temporaryDirectoryPath, `office.${type}.git`));
		console.log('…done.\n');
	} catch (error) {
		console.log('…failed with error', error);
	}
}
