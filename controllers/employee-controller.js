const { AppError } = require('../utils/app-error');
const Employee = require('../models/employee-model');

const getAllEmployees = async (req, res, next) => {
	try {
		const {
			page = 1,
			limit = 10,
			sort: sortBy = '-createdAt',
			fields = '-__v',
			...filter
		} = req.query;

		const skip = (page * 1 - 1) * limit * 1;

		const employees = await Employee.find(filter)
			.select(fields.split(','))
			.sort(sortBy)
			.skip(skip)
			.limit(Number(limit));

		res.json({
			status: 'success',
			data: { employees }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

const getEmployeeById = async (req, res, next) => {
	try {
		const { id: employeeId } = req.params;

		// check company first

		const employee = await Employee.findById(employeeId).populate('company');

		res.json({
			status: 'success',
			data: { employee }
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

module.exports = { getAllEmployees, getEmployeeById, createEmployee };
