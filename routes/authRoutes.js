const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route pour connecter un utilisateur
router.post('/login', authController.loginUser);

module.exports = router;
