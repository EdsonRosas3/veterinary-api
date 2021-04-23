const {Router} = require('express');
const router =  Router();
const {verifySignup} = require('../../Middleware');
const authController = require('../../controllers/authController');

router.post('/signin',authController.signIn);
router.post('/signup',verifySignup.checkDuplicateEmail,authController.signUp);

module.exports = router;