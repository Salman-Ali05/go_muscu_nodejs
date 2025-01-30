const express = require('express');
const router = express.Router();
const muscleController = require('../controllers/muscleController');
const authenticate = require('../middlewares/authMiddleware');

// Récupérer tous les muscles
router.get('/', authenticate, muscleController.getAllMuscles);

// Ajouter un muscle
router.post('/', authenticate, muscleController.createMuscle);

// Récupérer un muscle par ID
router.get('/:id', authenticate, muscleController.getMuscleById);

// Mettre à jour un muscle
router.put('/:id', authenticate, muscleController.updateMuscle);

// Supprimer un muscle
router.delete('/:id', authenticate, muscleController.deleteMuscle);

module.exports = router;
