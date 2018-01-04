import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	// TODO: Remove the `office.docx` file
	await invokePowerShellScript(directoryPath);
	// TODO: Confirm `office.docx.git` directory is removed
}
