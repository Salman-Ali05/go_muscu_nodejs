const Program = require('../models/Program');

// Récupérer tous les programmes
exports.getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find().populate('exercises');
        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Ajouter un programme
exports.createProgram = async (req, res) => {
    try {
        const { name, description, exercises, userID } = req.body;

        // Validation des champs
        if (!name || !description) {
            return res.status(400).json({ message: 'Nom et description sont obligatoires.' });
        }

        const newProgram = new Program({
            name,
            description,
            exercises,
            userID,
        });

        await newProgram.save();
        res.status(201).json({ message: 'Programme créé avec succès', program: newProgram });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du programme', error: err.message });
    }
};

// Récupérer un programme par ID
exports.getProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const program = await Program.findById(id).populate('exercises');

        if (!program) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        res.status(200).json(program);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Mettre à jour un programme
exports.updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, exercises } = req.body;

        const updatedProgram = await Program.findByIdAndUpdate(
            id,
            { name, description, exercises, updatedAt: Date.now() },
            { new: true } // Retourne le document mis à jour
        );

        if (!updatedProgram) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        res.status(200).json({ message: 'Programme mis à jour avec succès', program: updatedProgram });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du programme', error: err.message });
    }
};

// Supprimer un programme
exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        res.status(200).json({ message: 'Programme supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};
