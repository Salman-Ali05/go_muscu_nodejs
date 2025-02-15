const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nom obligatoire
  },
  muscleId: {
    type: mongoose.Schema.Types.ObjectId, // Référence au muscle associé
    ref: 'Muscle', // Modèle référencé
    required: true, // muscleId obligatoire
  },
  material: {
    type: String,
    default: 'Aucun', // Par défaut, aucun matériel requis
  },
  advice: {
    type: String,
    default: '', // Conseil optionnel
  },
  image: {
    type: String, // Stocke l'URL de l'image
    required: false, // Optionnel
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date de création automatique
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Date de mise à jour automatique
  },
});

exerciseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
