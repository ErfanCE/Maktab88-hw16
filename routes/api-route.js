const router = require('express').Router();
const employeeRoute = require('./employee-route');
const companyRoute = require('./company-route');
const authRoute = require('./auth-router');

router.use('/auth', authRoute);

router.use('/employees', employeeRoute);

router.use('/companies', companyRoute);

module.exports = router;
