import * as events from 'events';
import * as fs from 'fs';
import * as readline from 'readline';

let totalContains = 0;

const pairsContains = (line) => {
	const pairs = line.split(',');

	const rangeA = pairs[0].split('-');
	const rangeB = pairs[1].split('-');

	if (
		parseInt(rangeA[0]) <= parseInt(rangeB[0]) &&
		parseInt(rangeA[1]) >= parseInt(rangeB[1])
	) {
		totalContains++;
	} else if (
		parseInt(rangeB[0]) <= parseInt(rangeA[0]) &&
		parseInt(rangeB[1]) >= parseInt(rangeA[1])
	) {
		totalContains++;
	}
};

async function processLineByLine() {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream('./input.txt'),
			crlfDelay: Infinity,
		});

		rl.on('line', (line) => {
			pairsContains(line);
		});

		await events.once(rl, 'close');

		console.log('Reading file line by line with readline done.');
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(
			`The script uses approximately ${Math.round(used * 100) / 100} MB`
		);

		console.log(totalContains);
	} catch (err) {
		console.error(err);
	}
}

processLineByLine();
