const UserPerf = require('../models/UserPerf');

// Récupérer toutes les performances d'un utilisateur
exports.getAllUserPerformances = async (req, res) => {
  try {
    const { userId } = req.query;

    const query = userId ? { userId } : {};
    const performances = await UserPerf.find(query).populate('exerciseId userId');
    res.status(200).json(performances);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Ajouter une performance
exports.createUserPerformance = async (req, res) => {
  try {
    const { userId, exerciseId, maxKg, maxRep } = req.body;

    // Validation des champs obligatoires
    if (!userId || !exerciseId || !maxKg || !maxRep) {
      return res.status(400).json({ message: 'Certains champs obligatoires sont manquants.' });
    }

    const newPerformance = new UserPerf({
      userId,
      exerciseId,
      maxKg,
      maxRep,
    });

    await newPerformance.save();
    res.status(201).json({ message: 'Performance ajoutée avec succès', performance: newPerformance });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l’ajout de la performance', error: err.message });
  }
};

// Récupérer une performance par ID
exports.getUserPerformanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await UserPerf.findById(id).populate('exerciseId userId');

    if (!performance) {
      return res.status(404).json({ message: 'Performance non trouvée' });
    }

    res.status(200).json(performance);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour une performance
exports.updateUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const { maxKg, maxRep } = req.body;

    const updatedPerformance = await UserPerf.findByIdAndUpdate(
      id,
      { maxKg, maxRep, updatedAt: Date.now() },
      { new: true } // Retourne le document mis à jour
    );

    if (!updatedPerformance) {
      return res.status(404).json({ message: 'Performance non trouvée' });
    }

    res.status(200).json({ message: 'Performance mise à jour avec succès', performance: updatedPerformance });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de la performance', error: err.message });
  }
};

// Supprimer une performance
exports.deleteUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPerformance = await UserPerf.findByIdAndDelete(id);

    if (!deletedPerformance) {
      return res.status(404).json({ message: 'Performance non trouvée' });
    }

    res.status(200).json({ message: 'Performance supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
