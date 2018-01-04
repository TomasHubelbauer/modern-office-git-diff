import { generateTemporaryOfficeFile, initializeGitRepository, stageGitFile, invokePowerShellScript, inspectTextSpans } from '../util.mjs';

export default async function() {
	const { directoryPath, filePath } = await generateTemporaryOfficeFile('pptx', powerPoint => {
		const slide = powerPoint.makeNewSlide();
		slide.addText('Hello,');
		slide.addText('World!');
	
		const titleSlide = powerPoint.makeTitleSlide();
		titleSlide.setTitle('Hello hello hello');
		titleSlide.setSubTitle('It is a-me Mario');
	});

	await initializeGitRepository(directoryPath);
	await stageGitFile(filePath, directoryPath);
	await invokePowerShellScript(directoryPath);

	const slideSpans = await inspectTextSpans('ppt/slides/slide1.xml.txt', filePath);
	if (slideSpans[1] !== 'Hello,' || slideSpans[2] !== 'World!' || slideSpans[3] !== '\r') {
		throw new Error('The resulting TXT file for slide did not have matching spans to what was inserted.\n', slideSpans.join('\n'));
	}

	const titleSlideSpans = await inspectTextSpans('ppt/slides/slide2.xml.txt', filePath);
	if (titleSlideSpans[1] !== 'Hello hello hello' || titleSlideSpans[2] !== 'It is a-me Mario' || titleSlideSpans[5] !== '\r') {
		throw new Error('The resulting TXT file for title slide did not have matching spans to what was inserted.\n', titleSlideSpans.join('\n'));
	}
}
