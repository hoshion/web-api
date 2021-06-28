const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();
const {body} = require('express-validator');
const btcRateController = require('../controllers/btcrate-controller');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/user/login', userController.login);
router.post('/user/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);
router.get('/btcRate', authMiddleware, btcRateController.btcRate);
router.get('/user/refresh', userController.refresh)

module.exports = router;