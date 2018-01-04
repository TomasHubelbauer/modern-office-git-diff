import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript, unlinkFile, accessFile } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	await unlinkFile(filePath);
	await invokePowerShellScript(directoryPath);
	if (await accessFile(filePath + '.git')) {
		throw new Error('The directory still exists but should have been disposed.');
	}
}
