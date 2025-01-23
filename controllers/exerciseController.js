const Exercise = require('../models/Exercise');

// Récupérer tous les exercices
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find().populate('muscleId');
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Ajouter un exercice
exports.createExercise = async (req, res) => {
    try {
        const { name, muscleId, material, advice, rest, nbRep } = req.body;

        // Validation des champs obligatoires
        if (!name || !muscleId || !rest || !nbRep) {
            return res.status(400).json({ message: 'Certains champs obligatoires sont manquants.' });
        }

        const newExercise = new Exercise({
            name,
            muscleId,
            material,
            advice,
            rest,
            nbRep,
        });

        await newExercise.save();
        res.status(201).json({ message: 'Exercice créé avec succès', exercise: newExercise });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création de l’exercice', error: err.message });
    }
};

// Récupérer un exercice par ID
exports.getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findById(id).populate('muscleId');

        if (!exercise) {
            return res.status(404).json({ message: 'Exercice non trouvé' });
        }

        res.status(200).json(exercise);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Mettre à jour un exercice
exports.updateExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, muscleId, material, advice, rest, nbRep } = req.body;

        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            { name, muscleId, material, advice, rest, nbRep, updatedAt: Date.now() },
            { new: true } // Retourne le document mis à jour
        );

        if (!updatedExercise) {
            return res.status(404).json({ message: 'Exercice non trouvé' });
        }

        res.status(200).json({ message: 'Exercice mis à jour avec succès', exercise: updatedExercise });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de l’exercice', error: err.message });
    }
};

// Supprimer un exercice
exports.deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedExercise = await Exercise.findByIdAndDelete(id);

        if (!deletedExercise) {
            return res.status(404).json({ message: 'Exercice non trouvé' });
        }

        res.status(200).json({ message: 'Exercice supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};
