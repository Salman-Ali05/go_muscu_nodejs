const express = require('express');
const router = express.Router();
const userPerfController = require('../controllers/userPerfController');
const authenticate = require('../middlewares/authMiddleware');

// Récupérer toutes les performances (optionnellement par utilisateur)
router.get('/',authenticate, userPerfController.getAllUserPerformances);

// Ajouter une performance
router.post('/',authenticate, userPerfController.createUserPerformance);

// Récupérer une performance par ID
router.get('/:id',authenticate, userPerfController.getUserPerformanceById);

// Mettre à jour une performance
router.put('/:id',authenticate, userPerfController.updateUserPerformance);

// Supprimer une performance
router.delete('/:id',authenticate, userPerfController.deleteUserPerformance);

module.exports = router;
