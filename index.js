const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes'); // Import des routes d'authentification
const programRoutes = require('./routes/programsRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const muscleRoutes = require('./routes/muscleRoute');
const userPerfRoutes = require('./routes/userPerfRoutes');
require('dotenv').config(); // Charger les variables d'environnement

// Création de l'application Express
const app = express();

// Middleware pour analyser le JSON
app.use(express.json());

// Connexion à MongoDB (Utilisation d'une URI distante pour MongoDB Atlas)
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Connecté à MongoDB Atlas 🚀');
        }
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
        process.exit(1); // Arrêter l'application en cas d'erreur critique
    });

// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/muscles', muscleRoutes);
app.use('/api/user-perfs', userPerfRoutes);

// Gestion des routes inexistantes
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur interne' });
});

// Exporter l'application Express pour Vercel
module.exports = app;
