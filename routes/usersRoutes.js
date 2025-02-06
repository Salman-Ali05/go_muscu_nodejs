const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../middlewares/authMiddleware');

// Route pour obtenir tous les utilisateurs
router.get('/', authenticate, usersController.getAllUsers);

// Route pour créer un utilisateur
router.post('/', usersController.createUser);

// Route pour créer un utilisateur
router.put('/:id', authenticate, usersController.updateUser);

// Route pour obtenir un utilisateur par ID
router.get('/:id', authenticate, usersController.getUserById);

// Route pour supprimer un utilisateur
router.delete('/:id', authenticate, usersController.deleteUser);
  

module.exports = router;
