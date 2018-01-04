import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript, inspectText, inspectTextSpans } from '../util.mjs';

const expectedWordDocumentXmlSpan = '<!-- Generated. Do not edit. https://github.com/TomasHubelbauer/modern-office-git-diff -->\r';
const expectedWordDocumentXmlTxtSpan = String.fromCharCode(65279) /* BOM*/ + '# Generated. Do not edit. https://github.com/TomasHubelbauer/modern-office-git-diff';
const expectedReadMeMdText = String.fromCharCode(65279) /* BOM*/ + `# \`office.docx\`

Generated. Do not edit. https://github.com/TomasHubelbauer/modern-office-git-diff\r\n`;

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('docx', word => {
		const paragraph = word.createP();
		paragraph.addText('Hello, World!');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);

	const readMeMdText = await inspectText('README.md', filePath);
	if (readMeMdText !== expectedReadMeMdText) {
		throw new Error(`README.md text did not match. >${readMeMdText}< versus >${expectedReadMeMdText}<`);
	}

	const wordDocumentXmlTxtSpans = await inspectTextSpans('word/document.xml.txt', filePath);
	if (wordDocumentXmlTxtSpans[0] !== expectedWordDocumentXmlTxtSpan) {
		throw new Error(`word/document.xml.txt span did not match. >${wordDocumentXmlTxtSpans[0]}< versus >${expectedWordDocumentXmlTxtSpan}<`);
	}

	const wordDocumentXmlSpans = await inspectTextSpans('word/document.xml', filePath);
	if (wordDocumentXmlSpans[1] !== expectedWordDocumentXmlSpan) {
		throw new Error(`word/document.xml span did not match. >${wordDocumentXmlSpans[1]}< versus >${expectedWordDocumentXmlSpan}<`);
	}
}
