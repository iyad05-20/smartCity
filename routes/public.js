const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.getHome);
router.get('/qui-sommes-nous', publicController.getQui);
router.get('/axes', publicController.getAxes);
router.get('/projets', publicController.getProjets);
router.get('/formations', publicController.getFormations);
router.get('/publications', publicController.getPublications);
router.get('/evenements', publicController.getEvents);

module.exports = router;
