import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript, commitGitStage, getLastModifiedDate } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	await commitGitStage(directoryPath);
	const modified = await getLastModifiedDate('word/document.xml.txt', filePath);
	await invokePowerShellScript(directoryPath);
	if (modified !== await getLastModifiedDate('word/document.xml.txt', filePath)) {
		throw new Error(`Modified date changed but file did not. ${modified} !== ${await getLastModifiedDate('word/document.xml.txt', filePath)}`);
	}
}
