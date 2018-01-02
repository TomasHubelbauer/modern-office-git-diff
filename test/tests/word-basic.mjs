import fs from 'fs';
import util from 'util';
import path from 'path';

const readFile = util.promisify(fs.readFile);

export default function(word) {
	const p1 = word.createP();
	p1.addText('Hello,');
	p1.addText('World!');

	const p2 = word.createP();
	p2.addText('Hi,');
	p2.addText('it is me, Tom!');

	return async (dir) => {
		const spans = String(await readFile(path.join(dir, 'word/document.xml.txt'))).split('\n');
		if (spans[1] !== 'Hello,' || spans[2] !== 'World!' || spans[3] !== 'Hi,' || spans[4] !== 'it is me, Tom!' || spans[5] !== '\r') {
			throw new Error('The resulting TXT file did not have matching spans to what was inserted.');
		}
	}
}
