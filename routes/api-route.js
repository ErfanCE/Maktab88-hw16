const router = require('express').Router();
const employeeRoute = require('./employee-route');

router.use('/employees', employeeRoute);

module.exports = router;
