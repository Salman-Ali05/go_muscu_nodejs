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
        const { name, description, exercises, nbRep } = req.body;

        // Validation des champs
        if (!name || !description, !nbRep) {
            return res.status(400).json({ message: 'Nom et description sont obligatoires.' });
        }

        // Créer un nouveau programme
        const newProgram = new Program({
            name,
            description,
            exercises,
            nbRep
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

        // Vérifie si l'ID est valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

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

        // Vérifie si l'ID est valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        // Récupérer le programme existant
        const program = await Program.findById(id);
        if (!program) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        // Fusionner les exercices existants avec ceux fournis
        if (exercises) {
            program.exercises = [...new Set([...program.exercises, ...exercises])];
        }

        // Mettre à jour les autres champs si fournis
        if (name) program.name = name;
        if (description) program.description = description;

        // Sauvegarder le programme mis à jour
        const updatedProgram = await program.save();

        res.status(200).json({ message: 'Programme mis à jour avec succès', program: updatedProgram });
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du programme', error: err.message });
    }
};

// Supprimer un programme
exports.deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifie si l'ID est valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID invalide.' });
        }

        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return res.status(404).json({ message: 'Programme non trouvé' });
        }

        res.status(200).json({ message: 'Programme supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};
