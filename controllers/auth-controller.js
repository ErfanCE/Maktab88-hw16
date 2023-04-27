const User = require('../models/user-model');
const { AppError } = require('../utils/app-error');

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

		// TODO: send token

		res.status(201).json({
			status: 'success',
			data: { user }
		});
	} catch (error) {
		console.log(error);
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

		const isMatchPassword = await user.comparePassword(password);

		if (!isMatchPassword) {
			return next(new AppError(401, 'user or !password not match'));
		}

		res.status(200).json({
			status: 'success',
			data: { user }
		});
	} catch (error) {
		console.log(error);
		next(new AppError(500, 'internal server error'));
	}
};

module.exports = { signup, login };
