const router = require('express').Router();
const employeeRoute = require('./employee-route');
const companyRoute = require('./company-route');

router.use('/employees', employeeRoute);

router.use('/companies', companyRoute);

module.exports = router;
