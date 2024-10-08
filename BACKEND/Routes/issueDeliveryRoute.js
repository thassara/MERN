const express = require('express'); 
const router = express.Router(); 
const issueDeliveryController = require('../controllers/issueDeliveryController'); 


router.get('/', issueDeliveryController.getAllIssueDeliveries); 
router.get('/:id', issueDeliveryController.getIssueDeliveryById); 
router.post('/', issueDeliveryController.createIssueDelivery); 
router.put('/:id', issueDeliveryController.updateIssueDelivery); 
router.delete('/:id', issueDeliveryController.deleteIssueDelivery); 

  
module.exports = router;