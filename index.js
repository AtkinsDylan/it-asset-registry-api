const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const assetsRouter = require('./src/routes/assets');
const auditLogRouter = require('./src/routes/auditLog');
const usersRouter = require('./src/routes/users');
const departmentsRouter = require('./src/routes/departments');

app.use('/assets', assetsRouter);
app.use('/audit-log', auditLogRouter);
app.use('/users', usersRouter);
app.use('/departments', departmentsRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'IT Asset Registry API is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});