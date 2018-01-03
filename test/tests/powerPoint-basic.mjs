import fs from 'fs';
import util from 'util';
import path from 'path';

const readFile = util.promisify(fs.readFile);

export default function(powerPoint) {
	const slide = powerPoint.makeNewSlide();
	slide.addText('Hello,');
	slide.addText('World!');

	const titleSlide = powerPoint.makeTitleSlide();
	titleSlide.setTitle('Hello hello hello');
	titleSlide.setSubTitle('It is a-me Mario');

	return async (dir) => {
		const slideSpans = String(await readFile(path.join(dir, 'ppt/slides/slide1.xml.txt'))).split('\n');
		if (slideSpans[1] !== 'Hello,' || slideSpans[2] !== 'World!' || slideSpans[3] !== '\r') {
			throw new Error('The resulting TXT file for slide did not have matching spans to what was inserted.\n', slideSpans.join('\n'));
		}

		const titleSlideSpans = String(await readFile(path.join(dir, 'ppt/slides/slide2.xml.txt'))).split('\n');
		if (titleSlideSpans[1] !== 'Hello hello hello' || titleSlideSpans[2] !== 'It is a-me Mario' || titleSlideSpans[5] !== '\r') {
			throw new Error('The resulting TXT file for title slide did not have matching spans to what was inserted.\n', titleSlideSpans.join('\n'));
		}
	};
}
