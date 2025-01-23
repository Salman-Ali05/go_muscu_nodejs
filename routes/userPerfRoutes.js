const express = require('express');
const router = express.Router();
const userPerfController = require('../controllers/userPerfController');

// Récupérer toutes les performances (optionnellement par utilisateur)
router.get('/', userPerfController.getAllUserPerformances);

// Ajouter une performance
router.post('/', userPerfController.createUserPerformance);

// Récupérer une performance par ID
router.get('/:id', userPerfController.getUserPerformanceById);

// Mettre à jour une performance
router.put('/:id', userPerfController.updateUserPerformance);

// Supprimer une performance
router.delete('/:id', userPerfController.deleteUserPerformance);

module.exports = router;
