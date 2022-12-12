import * as events from 'events';
import * as fs from 'fs';
import * as readline from 'readline';

let elfTotalCalories = 0;
const elfCalories = [];

const processLine = (line) => {
	if (line) {
		elfTotalCalories = elfTotalCalories + parseInt(line, 10);
	} else {
		elfCalories.push(elfTotalCalories);
		elfTotalCalories = 0;
	}
};

let totalTop = 0;

const getXTopValuesOfArray = (arrayValues, x) => {
	for (let index = 0; index < x; index++) {
		const maxValue = Math.max(...arrayValues);
		console.log(maxValue);
		totalTop += maxValue;

		elfCalories.splice(arrayValues.indexOf(maxValue), 1);
	}
};

async function processLineByLine() {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream('./input.txt'),
			crlfDelay: Infinity,
		});

		rl.on('line', (line) => {
			processLine(line);
		});

		await events.once(rl, 'close');

		console.log('Reading file line by line with readline done.');
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(
			`The script uses approximately ${Math.round(used * 100) / 100} MB`
		);

		console.log(Math.max(...elfCalories));

		getXTopValuesOfArray(elfCalories, 20);

		console.log(totalTop);
	} catch (err) {
		console.error(err);
	}
}

processLineByLine();
