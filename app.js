//sum drill

const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('common'));

app.listen(8000, () => {
	console.log('Express server is listening on port 8000!');
})

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if(!a) {
    return res.status(400).send('Please provide a value for a');
  }

  if(!b) {
    return res.status(400).send('Please provide a value for b');
	}

	const numA= parseFloat(a);
	const numB= parseFloat(b);

	if (isNaN(numA)) {
		return res.status(400).send(`a must be a number`);
	}

	if (isNaN(numB)) {
		return res.status(400).send(`b must be a number`);
	}

	const c = numA + numB
	
  const sum = `The sum of ${a} and ${b} is ${c}`;

  res.send(sum);
});

//cipher drill

app.get('/cipher', (req, res) => {
	const { text, shift } = req.query;

	if(!text) {
		return res.status(400).send('text is required');
	}

	if(!shift) {
		return res.status(400).send('shift is required');
	}

	const numShift = parseFloat(shift);
	
	if (isNaN(numShift)) {
		return res.status(400).send('shift must be number');
	}

	const base = 'A'.charCodeAt(0)
	
	const cipher = text.toUpperCase().split('').map(char => {
		const code = char.charCodeAt(0);

		if (code < base || code > (base + 26)){
			return char;
		}

		let diff = code - base;
		diff = diff + numShift;

		diff = diff % 26;

		const shiftedChar =String.fromCharCode(base + diff);
		return shiftedChar;
	})
	.join('');

	res.status(200).send(cipher);
});

//lotto drill

app.get('/lotto', (req, res) => {
  const { numbers } = req.query; 

  // validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if(!numbers) {
    return res
      .status(200)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send("numbers must be an array");
  }

  const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }      

	const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
	
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  let diff = winningNumbers.filter(n => !guesses.includes(n));

  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  // res.json({
  //   guesses,
  //   winningNumbers,
  //   diff,
  //   responseText
  // });

  res.send(responseText);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});