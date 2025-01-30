const jwt = require('jsonwebtoken');

// Middleware pour vérifier l'authentification
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    // Vérifie si le token est présent
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé : Token manquant.' });
    }

    try {
        // Vérifie la validité du token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret_key'; // Utilise la clé secrète
        const decoded = jwt.verify(token, jwtSecret);

        // Ajoute les informations de l'utilisateur dans la requête
        req.user = decoded;
        next(); // Passe au prochain middleware ou contrôleur
    } catch (err) {
        res.status(403).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = authenticate;