const {Router} = require('express');
const router =  Router();
const userCtr = require('../../Controllers/userController');

router.get('/veterinarians',userCtr.getVeterinaries);

module.exports = router;