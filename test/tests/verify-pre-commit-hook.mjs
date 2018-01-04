import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	// TODO: Copy over `hook/pre-commit-development.sh`
	// TODO: Run Git commit
	// TODO: Verify `office.docx.git` directory exists
}
