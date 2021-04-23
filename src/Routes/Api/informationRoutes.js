const {Router} = require('express');
const router =  Router();
const informationCtr = require('../../controllers/infPublicController');

/**Admin access */
router.get('/pending',informationCtr.getPendingInformations);
router.put('/answer/:id',informationCtr.updateInformationStateById);

/**Vet access, Admin access */
router.post('/',informationCtr.createInformation);
router.put('/:id',informationCtr.updateInformationById);
router.delete('/:id',informationCtr.deleteInfromationById);

/**Public access, Vet access, Admin access*/
router.get('/:id',informationCtr.getInformationById);
router.get('/',informationCtr.getPermittedInformations);

module.exports = router;