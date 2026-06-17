const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getDashboard);
router.get('/events', adminController.getEvents);
router.get('/projects', adminController.getProjects);
router.get('/publications', adminController.getPublications);
router.get('/formations', adminController.getFormations);
router.get('/chiffres', adminController.getChiffres);
router.post('/chiffres', adminController.postChiffres);
router.get('/settings', adminController.getSettings);
router.post('/settings', adminController.postSettings);
router.get('/selection', adminController.getSelection);
router.post('/selection', adminController.postSelection);

router.post('/projects/add', adminController.postAddProject);
router.post('/projects/delete/:id', adminController.postDeleteProject);

router.post('/events/add', adminController.postAddEvent);
router.post('/events/delete/:id', adminController.postDeleteEvent);

router.post('/publications/add', adminController.postAddPublication);
router.post('/publications/delete/:id', adminController.postDeletePublication);

router.post('/formations/add', adminController.postAddFormation);
router.post('/formations/delete/:id', adminController.postDeleteFormation);

module.exports = router;
