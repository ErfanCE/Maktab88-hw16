const router = require('express').Router();
const {
	getAllEmployees,
	createEmployee
} = require('../controllers/employee-controller');

router.get('/', getAllEmployees);
router.post('/', createEmployee);

module.exports = router;
