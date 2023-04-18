const router = require('express').Router();
const {
	getAllCompanies,
	createCompany,
	getCompanyById
} = require('../controllers/company-controller');

router.get('/', getAllCompanies);
router.post('/', createCompany);

router.get('/:id', getCompanyById);

module.exports = router;
