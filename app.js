require('dotenv').config();

// Third Party Modules
const express = require('express');
const mongoose = require('mongoose');

// Local Modules
const { AppError } = require('./utils/app-error');

const apiRouter = require('./routes/api-route');

const app = express();
const port = 8000;
const host = '127.0.0.1';

// db connection
mongoose
	.connect('mongodb://127.0.0.1:27017/corporate')
	.then(() => {
		console.log('[+] database connected');
	})
	.catch(err => {
		console.error('[-] database connection > ', err);
	});

// Body Parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routing
app.use('/api', apiRouter);

// Not Found Routes
app.all('*', (req, res, next) => {
	next(new AppError(404, `can't find ${req.method} ${req.originalUrl}`));
});

// Global Error Handler
app.use((err, req, res, next) => {
	const {
		statusCode = 500,
		status = 'error',
		message = 'internal sever error, not your fault :)'
	} = err;

	res.status(statusCode).json({ status, message });
});

app.listen(port, host, () => {
	console.info(`[i] server is running on ${host}:${port} ...`);
});
