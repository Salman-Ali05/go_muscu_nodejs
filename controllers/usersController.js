const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclut le mot de passe
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Ajouter un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, birthdate, programID } = req.body;

    // Vérification des champs obligatoires
    if (!name || !email || !password || !birthdate || !programID) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      birthdate,
      programID
    });

    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error: err.message });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const user = await User.findById(id).select('-password'); // Exclut le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour un user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // ID de l'utilisateur à mettre à jour
    const { name, email, password, birthdate, programID } = req.body; // Champs modifiables

    // Vérifie si l'utilisateur existe
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour uniquement les champs fournis dans la requête
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;

    // Si un mot de passe est fourni, le hacher avant de l'enregistrer
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    if (birthdate) updatedFields.birthdate = birthdate;
    if (programID) updatedFields.programID = programID;

    // Mise à jour dans la base de données
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true } // Retourne l'utilisateur mis à jour et applique les validateurs
    );

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès',
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la mise à jour de l\'utilisateur',
      error: err.message,
    });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation de l'ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
