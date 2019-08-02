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