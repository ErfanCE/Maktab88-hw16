const { AppError } = require('../utils/app-error');
const Employee = require('../models/employee-model');

const getAllEmployees = async (req, res, next) => {
	try {
		const employees = await Employee.find({});

		res.json({
			status: 'success',
			data: { employees }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

const createEmployee = async (req, res, next) => {
	try {
		const employees = await Employee.create(req.body);

		res.json({
			status: 'success',
			data: { employees }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

module.exports = { getAllEmployees, createEmployee };
