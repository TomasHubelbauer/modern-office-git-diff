import fs from 'fs';
import util from 'util';
import path from 'path';

const readFile = util.promisify(fs.readFile);

export default function(excel) {
	const s1 = excel.makeNewSheet('sheet1');
	s1.setCell('A1', 'Hello,');
	s1.setCell('B2', 'World!');

	const s2 = excel.makeNewSheet('sheet2');
	s1.setCell('C3', 'Hi,');
	s1.setCell('D4', 'here');
	s1.setCell('D4', 'there');

	return async (dir) => {
		const spans = String(await readFile(path.join(dir, 'xl/sharedStrings.xml.txt'))).split('\n');
		if (spans[1] !== 'Hello,' || spans[2] !== 'World!' || spans[3] !== 'Hi,' || spans[4] !== 'there' || spans[5] !== '\r') {
			throw new Error('The resulting TXT file did not have matching spans to what was inserted.\n' + spans.join('\n'));
		}
	};
}
