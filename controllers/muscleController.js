const Muscle = require('../models/Muscle');

// Récupérer tous les muscles
exports.getAllMuscles = async (req, res) => {
  try {
    const muscles = await Muscle.find();
    res.status(200).json(muscles);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Ajouter un muscle
exports.createMuscle = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation des champs obligatoires
    if (!name) {
      return res.status(400).json({ message: 'Le nom est obligatoire.' });
    }

    const newMuscle = new Muscle({
      name,
    });

    await newMuscle.save();
    res.status(201).json({ message: 'Muscle créé avec succès', muscle: newMuscle });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création du muscle', error: err.message });
  }
};

// Récupérer un muscle par ID
exports.getMuscleById = async (req, res) => {
  try {
    const { id } = req.params;
    const muscle = await Muscle.findById(id);

    if (!muscle) {
      return res.status(404).json({ message: 'Muscle non trouvé' });
    }

    res.status(200).json(muscle);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour un muscle
exports.updateMuscle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedMuscle = await Muscle.findByIdAndUpdate(
      id,
      { name, updatedAt: Date.now() },
      { new: true } // Retourne le document mis à jour
    );

    if (!updatedMuscle) {
      return res.status(404).json({ message: 'Muscle non trouvé' });
    }

    res.status(200).json({ message: 'Muscle mis à jour avec succès', muscle: updatedMuscle });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du muscle', error: err.message });
  }
};

// Supprimer un muscle
exports.deleteMuscle = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMuscle = await Muscle.findByIdAndDelete(id);

    if (!deletedMuscle) {
      return res.status(404).json({ message: 'Muscle non trouvé' });
    }

    res.status(200).json({ message: 'Muscle supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
