const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route pour obtenir tous les utilisateurs
router.get('/', usersController.getAllUsers);

// Route pour créer un utilisateur
router.post('/', usersController.createUser);

// Route pour obtenir un utilisateur par ID
router.get('/:id', usersController.getUserById);

// Route pour supprimer un utilisateur
router.delete('/:id', usersController.deleteUser);
  

module.exports = router;
