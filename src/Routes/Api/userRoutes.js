const {Router} = require('express');
const router =  Router();
const userCtr = require('../../Controllers/userController');

router.get('/veterinarians',userCtr.getVeterinaries);
router.get('/veterinary/:id',userCtr.getUserById);
router.put('/veterinary/:id',userCtr.updateUserById);
module.exports = router;