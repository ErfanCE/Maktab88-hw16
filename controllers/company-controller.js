const { AppError } = require('../utils/app-error');
const Company = require('../models/company-model');
const Employee = require('../models/employee-model');

const getAllCompanies = async (req, res, next) => {
	try {
		const companies = await Company.find({});

		res.json({
			status: 'success',
			data: { companies }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

const getCompanyById = async (req, res, next) => {
	try {
		const { id: companyId } = req.params;

		const company = await Company.findById(companyId);

		const companyEmployees = await Employee.find({ company: companyId });

		res.json({
			status: 'success',
			data: { company, companyEmployees }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

const createCompany = async (req, res, next) => {
	try {
		const company = await Company.create(req.body);

		res.json({
			status: 'success',
			data: { company }
		});
	} catch (error) {
		next(new AppError(500, error.message));
	}
};

module.exports = { getAllCompanies, getCompanyById, createCompany };
