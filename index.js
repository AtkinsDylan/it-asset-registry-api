const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const assetsRouter = require('./src/routes/assets');
app.use('/assets', assetsRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'IT Asset Registry API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});