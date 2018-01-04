import officegen from 'officegen';
import os from 'os';
import fs from 'fs';
import child_process from 'child_process';
import util from 'util';
import path from 'path';

const mkdtemp = util.promisify(fs.mkdtemp);
const exec = util.promisify(child_process.exec);
const readFile = util.promisify(fs.readFile);

export async function generateTemporaryOfficeFile(type, setup) {
	const office = officegen({ type });
	setup(office);

	const directoryPath = await mkdtemp(path.join(os.tmpdir(), 'modern-office-diff-git'));
	const filePath = path.join(directoryPath, 'office.' + type);
	
	const promise = new Promise((resolve, reject) => {
		office.on('finalize', resolve);
		office.on('error', reject);
	});

	office.generate(fs.createWriteStream(filePath));
	await promise;

	return {
		directoryPath,
		filePath
	};
}

export async function initializeGitRepository(directoryPath) {
	try {
		const { stdout, stderr } = await exec(`git init`, { cwd: directoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log(error);
	}
}

export async function stageGitFile(filePath, workingDirectoryPath) {
	try {
		const { stdout, stderr } = await exec(`git add "${filePath}"`, { cwd: workingDirectoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log(error);
	}
}

export async function invokePowerShellScript(workingDirectoryPath) {
	try {
		const scriptFilePath = path.join(process.cwd(), '../cmd/version-office-files.ps1');
		const { stdout, stderr } = await exec(`powershell ${scriptFilePath}`, { cwd: workingDirectoryPath });
		console.log(stdout);
		console.error(stderr);
	} catch (error) {
		console.log(error);
	}
}

export async function inspectTextSpans(archiveFilePath, officeFilePath) {
	return String(await readFile(path.join(officeFilePath + '.git', archiveFilePath))).split('\n');
}
