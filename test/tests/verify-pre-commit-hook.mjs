import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, commitGitStage, accessFile, clonePowerShellScript, copyToPreCommitHook } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await clonePowerShellScript(directoryPath);
	await copyToPreCommitHook(directoryPath, 'hook/pre-commit.sh');
	await commitGitStage(directoryPath);
	if (!(await accessFile(filePath + '.git'))) {
		throw new Error('The directory did not get created, the hook did not run successfully.');
	}
}
