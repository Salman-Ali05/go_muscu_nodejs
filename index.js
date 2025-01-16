const express = require('express');
const app = express();

// Port d'écoute
const PORT = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur votre application Express!');
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
