import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	// TODO: Check `README.md` for content match
	// TODO: Check `word/document.xml.txt` for first line match
	// TODO: Check `word/document.xml` for XML comment match
}
