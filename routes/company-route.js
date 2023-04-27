const router = require('express').Router();
const { protect, restrictTo } = require('../controllers/auth-controller');
const {
	getAllCompanies,
	createCompany,
	getCompanyById
} = require('../controllers/company-controller');

router.get('/', protect, restrictTo('USER', 'ADMIN'), getAllCompanies);

router.post('/', createCompany);

router.get('/:id', protect, restrictTo('ADMIN'), getCompanyById);

module.exports = router;
