const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
	{
		firstname: {
			type: String,
			required: [true, 'firstname is required'],
			minlength: [3, 'firstname must be equal or more than 3 characters'],
			maxlength: [30, 'firstname must be equal or less than 30 characters'],
			trim: true
		},
		lastname: {
			type: String,
			required: [true, 'lastname is required'],
			minlength: [3, 'lastname must be equal or more than 3 characters'],
			maxlength: [30, 'lastname must be equal or less than 30 characters'],
			trim: true
		},
		username: {
			type: String,
			unique: true,
			required: [true, 'password is required']
		},
		password: {
			type: String,
			required: [true, 'password is required']
		},
		gender: {
			type: String,
			enum: {
				values: ['not-set', 'male', 'female'],
				message: 'invalid gender ({VALUE}): gender is eather male or female'
			},
			default: 'not-set',
			trim: true,
			lowercase: true
		},
		role: {
			type: String,
			enum: {
				values: ['USER', 'ADMIN'],
				message: 'invalid role ({VALUE}): role is eather USER or ADMIN'
			},
			default: 'USER',
			trim: true
		}
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

UserSchema.methods.comparePassword = async function (userPassword) {
	return await bcrypt.compare(userPassword, this.password);
};

module.exports = model('User', UserSchema);
