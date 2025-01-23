const bcrypt = require('bcrypt');
const User = require('../models/User');

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Ajouter un nouvel utilisateur avec hachage du mot de passe
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    // Vérification des champs obligatoires
    if (!name || !email || !password, !birthdate) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Création du nouvel utilisateur avec le mot de passe haché
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Utilisation du mot de passe haché
      birthdate
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }, // Pas de mot de passe dans la réponse
    });
  } catch (err) {
    res.status(400).json({
      message: 'Erreur lors de la création de l’utilisateur',
      error: err.message,
    });
  }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
