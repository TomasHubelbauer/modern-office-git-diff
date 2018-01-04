import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript, inspectTextSpans } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const p1 = word.createP();
		p1.addText('Hello,');
		p1.addText('World!');
	
		const p2 = word.createP();
		p2.addText('Hi,');
		p2.addText('it is me, Tom!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);
	const spans = await inspectTextSpans('word/document.xml.txt', filePath);

	if (spans[1] !== 'Hello,' || spans[2] !== 'World!' || spans[3] !== 'Hi,' || spans[4] !== 'it is me, Tom!' || spans[5] !== '\r') {
		throw new Error('The resulting TXT file did not have matching spans to what was inserted.\n' + spans.join('\n'));
	}
}
