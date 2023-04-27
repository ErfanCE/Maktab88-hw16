const { promisify } = require('node:util');
const User = require('../models/user-model');
const { AppError } = require('../utils/app-error');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
	try {
		const { firstname, lastname, username, password, gender } = req.body;

		const userExists = await User.exists({ username });

		if (userExists) {
			return next(new AppError(409, 'User exists already'));
		}

		const user = await User.create({
			firstname,
			lastname,
			username,
			password,
			gender,
			role: 'USER'
		});

		// sign token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRSES_IN
		});

		res.status(201).json({
			status: 'success',
			token,
			data: { user }
		});
	} catch (error) {
		next(new AppError(500, 'internal server error'));
	}
};

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });

		if (!user) {
			return next(new AppError(401, '!user or password not match'));
		}

		const isPasswordMatch = await user.comparePassword(password);

		if (!isPasswordMatch) {
			return next(new AppError(401, 'user or !password not match'));
		}

		// sign token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRSES_IN
		});

		res.status(200).json({
			status: 'success',
			token,
			data: { user }
		});
	} catch (error) {
		next(new AppError(500, 'internal server error'));
	}
};

const protect = async (req, res, next) => {
	try {
		if (
			!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer')
		) {
			return next(new AppError(401, 'you are not logged in'));
		}

		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return next(new AppError(401, 'you are not logged in'));
		}

		const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		const user = await User.findById(id);
		if (!user) {
			return next(
				new AppError(
					401,
					'user blonging to this token does not exists, login again'
				)
			);
		}

		// TODO: set cookie instead
		req.user = user;

		next();
	} catch (error) {
		next(new AppError(500, 'internal server error'));
	}
};

const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(403, 'you dont have permission to perform this action')
			);
		}

		next();
	};
};

module.exports = { signup, login, protect, restrictTo };
