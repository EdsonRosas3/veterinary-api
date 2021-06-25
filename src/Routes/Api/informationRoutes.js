const {Router} = require('express');
const router =  Router();
const informationCtr = require('../../Controllers/infPublicController');

/**Admin access */
router.get('/pending',informationCtr.getPendingInformations);
router.put('/answer/:id',informationCtr.updateInformationStateById);

/**Vet access, Admin access */
router.post('/',informationCtr.createInformation);
router.put('/:id',informationCtr.updateInformationById);
router.delete('/:id',informationCtr.deleteInfromationById);
router.get('/vet/:id',informationCtr.getInformationByIdUser);

/**Public access, Vet access, Admin access*/
router.get('/:id',informationCtr.getInformationById);
router.get('/',informationCtr.getPermittedInformations);
router.get('/category/nutritional/care',informationCtr.getCuidadoAlimenticio);
router.get('/category/diseases',informationCtr.getEfermedades);
router.get('/category/vaccines',informationCtr.getVacunas);


module.exports = router;