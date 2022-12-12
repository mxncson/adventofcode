import * as events from 'events';
import * as fs from 'fs';
import * as readline from 'readline';

// A for rock, B for paper, C for scissor
// X for rock, Y for paper, Z for scissor

const rules = {
	X: {
		p: 1,
		A: 3,
		B: 0,
		C: 6,
	},
	Y: {
		p: 2,
		A: 6,
		B: 3,
		C: 0,
	},
	Z: {
		p: 3,
		A: 0,
		B: 6,
		C: 3,
	},
};

// X for loss, Y for draw, Z for win
const rules2 = {
	A: {
		X: 3,
		Y: 4,
		Z: 8,
	},
	B: {
		X: 1,
		Y: 5,
		Z: 9,
	},
	C: {
		X: 2,
		Y: 6,
		Z: 7,
	},
};

let totalPoints = 0;

const calculateRoshamboPoints = (line) => {
	const players = line.split(' ');
	totalPoints += rules[players[1]].p;
	totalPoints += rules[players[1]][players[0]];
};

const calculateRoshamboPoints2 = (line) => {
	const players = line.split(' ');
	totalPoints += rules2[players[0]][players[1]];
};

async function processLineByLine() {
	try {
		const rl = readline.createInterface({
			input: fs.createReadStream('./input.txt'),
			crlfDelay: Infinity,
		});

		rl.on('line', (line) => {
			calculateRoshamboPoints2(line);
		});

		await events.once(rl, 'close');

		console.log('Reading file line by line with readline done.');
		const used = process.memoryUsage().heapUsed / 1024 / 1024;
		console.log(
			`The script uses approximately ${Math.round(used * 100) / 100} MB`
		);

		console.log('totalPoints: ', totalPoints);
	} catch (err) {
		console.error(err);
	}
}

processLineByLine();
