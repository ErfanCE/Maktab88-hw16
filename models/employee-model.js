const { Schema, model } = require('mongoose');
const { isMobilePhone } = require('validator');

const { provinceIran } = require('../data/iran-province-data');

const EmployeeSchema = new Schema(
	{
		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
			required: [true, 'company is required']
		},
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
		dateOfBirth: {
			type: Date,
			required: [true, 'dateOfBirth is required']
			// validate: {
			// 	validator: value => isDate(value),
			// 	message: 'provide valid dateOfBirth'
			// }
		},
		nationalCode: {
			type: String,
			required: [true, 'nationalCode is required'],
			unique: true,
			minlength: [10, 'nationalCode length must be 10 characters'],
			maxlength: [10, 'nationalCode length must be 10 characters'],
			trim: true
		},
		province: {
			type: String,
			default: 'not-set',
			trim: true,
			validate: {
				validator: value => provinceIran.includes(value),
				message: 'provide valid province'
			}
		},
		role: {
			type: String,
			enum: {
				values: ['manager', 'employee'],
				message: 'invalid role ({VALUE}): role is eather manager or employee'
			},
			default: 'employee',
			lowercase: true,
			trim: true
		},
		phoneNumber: {
			type: [String],
			unique: true,
			validate: {
				validator: value => {
					if (!value.length) return false;

					for (const phone of value) {
						if (!isMobilePhone(phone, 'ir-IR')) return false;
					}

					return true;
				},
				message: 'provide valid phoneNumber and at least one phoneNumber'
			},
			set: value => {
				const formattedPhoneNumbers = value.map(phone => {
					if (phone.startsWith('0')) return `+98${phone.slice(1)}`;

					return phone;
				});

				return formattedPhoneNumbers;
			}
		}
	},
	{ timestamps: true }
);

module.exports = model('Employee', EmployeeSchema);
