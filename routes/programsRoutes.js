const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const authenticate = require('../middlewares/authMiddleware');

// Récupérer tous les programmes
router.get('/', authenticate, programController.getAllPrograms);

// Ajouter un programme
router.post('/', authenticate, programController.createProgram);

// Récupérer un programme par ID
router.get('/:id', authenticate, programController.getProgramById);

// Mettre à jour un programme
router.put('/:id', authenticate, programController.updateProgram);

// Supprimer un programme
router.delete('/:id', authenticate, programController.deleteProgram);

module.exports = router;
