import officegen from 'officegen';
import os from 'os';
import fs from 'fs';
import child_process from 'child_process';
import util from 'util';
import path from 'path';

const mkdtemp = util.promisify(fs.mkdtemp);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);
const access = util.promisify(fs.access);
const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
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

export async function commitGitStage(workingDirectoryPath) {
	try {
		const { stdout, stderr } = await exec(`git commit -m "Commit changed files"`, { cwd: workingDirectoryPath });
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

export async function inspectText(archiveFilePath, officeFilePath) {
	return String(await readFile(path.join(officeFilePath + '.git', archiveFilePath))); // BOM?
}

export async function inspectTextSpans(archiveFilePath, officeFilePath) {
	return String(await readFile(path.join(officeFilePath + '.git', archiveFilePath))).split('\n');
}

export async function getLastModifiedDate(archiveFilePath, officeFilePath) {
	return (await stat(path.join(officeFilePath + '.git', archiveFilePath))).mtimeMs;
}

export async function unlinkFile(officeFilePath) {
	await unlink(officeFilePath);
}

export async function accessFile(directoryPath) {
	try {
		await access(directoryPath);
		return true;
	} catch (error) {
		return false;
	}
}

export async function copyToPreCommitHook(directoryPath, relativeHookFilePath) {
	await copyFile(path.join(process.cwd(), '..', relativeHookFilePath), path.join(directoryPath, '.git/hooks/pre-commit'));
}

export async function clonePowerShellScript(directoryPath) {
	await mkdir(path.join(directoryPath, 'cmd'));
	await copyFile(path.join(process.cwd(), '../cmd/version-office-files.ps1'), path.join(directoryPath, 'cmd/version-office-files.ps1'));
}
