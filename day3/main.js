import * as events from 'events';
import * as fs from 'fs';
import * as readline from 'readline';

let totalPriorities = 0;

const getCharPriorityValue = (char) => {
	let charCode = char.charCodeAt(0);

	return char == char.toLowerCase() ? charCode - 96 : charCode - 38;
};

const calculateRuckSackPriority = (line) => {
	const l = line.length / 2;
	const compartments = line.match(new RegExp(`.{${l}}`, 'g'));

	let sameItem;
	for (const char of compartments[0]) {
		if (compartments[1].includes(char)) {
			sameItem = char;
		}
	}

	totalPriorities += getCharPriorityValue(sameItem);
};

let index = 0;
let elfGroup = [];

const calculateElfSameItemByGroup = (x, line) => {
	index++;
	elfGroup.push(line);

	if (index === x) {
		index = 0;

		let sameItem;
		for (const char of elfGroup[0]) {
			if (elfGroup[1].includes(char) && elfGroup[2].includes(char)) {
				sameItem = char;
			}
		}

		totalPriorities += getCharPriorityValue(sameItem);

		elfGroup = [];
	}
};

async function processLineByLine() {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream('./input.txt'),
			crlfDelay: Infinity,
		});

		rl.on('line', (line) => {
			calculateElfSameItemByGroup(3, line);
		});

		await events.once(rl, 'close');

		console.log('Reading file line by line with readline done.');
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(
			`The script uses approximately ${Math.round(used * 100) / 100} MB`
		);

		console.log(totalPriorities);
	} catch (err) {
		console.error(err);
	}
}

processLineByLine();
