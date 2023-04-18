const router = require('express').Router();
const {
	getAllEmployees,
	getEmployeeById,
	createEmployee
} = require('../controllers/employee-controller');

router.get('/', getAllEmployees);
router.post('/', createEmployee);

router.get('/:id', getEmployeeById);

module.exports = router;
