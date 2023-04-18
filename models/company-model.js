const { Schema, model } = require('mongoose');
const { isMobilePhone } = require('validator');

const { provinceIran } = require('../data/iran-province-data');

const CompanySchema = new Schema(
	{
		companyName: {
			type: String,
			required: [true, 'companyName is required'],
			minlength: [2, 'companyName must be equal or more than 2 characters'],
			maxlength: [40, 'companyName must be equal or less than 40 characters'],
			trim: true
		},
		registerationCode: {
			type: String,
			unique: true,
			required: [true, 'registerationCode is required'],
			minlength: [10, 'registerationCode length must be 10 characters'],
			maxlength: [10, 'registerationCode length must be 10 characters'],
			trim: true
		},
		city: {
			type: String,
			default: 'not-set',
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
		phoneNumber: {
			type: String,
			unique: true,
			required: [true, 'phoneNumber is required'],
			validate: {
				validator: value => isMobilePhone(value, 'ir-IR'),
				message: 'provide valid phoneNumber'
			},
			set: value => {
				if (value.startsWith('0')) return `+98${value.slice(1)}`;

				return value;
			}
		}
	},
	{
		timestamps: {
			createdAt: 'registerationDate'
		}
	}
);

module.exports = model('Company', CompanySchema);
