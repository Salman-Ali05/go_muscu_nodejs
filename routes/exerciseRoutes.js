const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authenticate = require('../middlewares/authMiddleware');

// Récupérer tous les exercices
router.get('/', authenticate, exerciseController.getAllExercises);

// Ajouter un exercice
router.post('/', authenticate, exerciseController.createExercise);

// Récupérer un exercice par ID
router.get('/:id', authenticate, exerciseController.getExerciseById);

// Mettre à jour un exercice
router.put('/:id', authenticate, exerciseController.updateExercise);

// Supprimer un exercice
router.delete('/:id', authenticate, exerciseController.deleteExercise);

module.exports = router;
