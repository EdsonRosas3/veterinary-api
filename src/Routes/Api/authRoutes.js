const {Router} = require('express');
const router =  Router();
const {verifySignup} = require('../../Middleware');
const {signIn, signUp} = require('../../controllers/authController');

router.post('/signin',signIn);
router.post('/signup',verifySignup.checkDuplicateEmail,signUp);

module.exports = router;