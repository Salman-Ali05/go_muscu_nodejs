const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Récupérer tous les exercices
router.get('/', exerciseController.getAllExercises);

// Ajouter un exercice
router.post('/', exerciseController.createExercise);

// Récupérer un exercice par ID
router.get('/:id', exerciseController.getExerciseById);

// Mettre à jour un exercice
router.put('/:id', exerciseController.updateExercise);

// Supprimer un exercice
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;
