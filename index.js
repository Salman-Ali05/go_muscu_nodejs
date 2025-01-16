const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes'); // Import des routes d'authentification
const app = express();
const PORT = 3000;

// Middleware pour analyser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/gomuscu_e5', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connecté à MongoDB (gomuscu_e5)'))
    .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Ajoutez cette ligne pour l'authentification

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
