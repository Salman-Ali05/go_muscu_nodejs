const express = require('express');
const router = express.Router();
const muscleController = require('../controllers/muscleController');

// Récupérer tous les muscles
router.get('/', muscleController.getAllMuscles);

// Ajouter un muscle
router.post('/', muscleController.createMuscle);

// Récupérer un muscle par ID
router.get('/:id', muscleController.getMuscleById);

// Mettre à jour un muscle
router.put('/:id', muscleController.updateMuscle);

// Supprimer un muscle
router.delete('/:id', muscleController.deleteMuscle);

module.exports = router;
