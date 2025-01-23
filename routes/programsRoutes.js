const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Récupérer tous les programmes
router.get('/', programController.getAllPrograms);

// Ajouter un programme
router.post('/', programController.createProgram);

// Récupérer un programme par ID
router.get('/:id', programController.getProgramById);

// Mettre à jour un programme
router.put('/:id', programController.updateProgram);

// Supprimer un programme
router.delete('/:id', programController.deleteProgram);

module.exports = router;
