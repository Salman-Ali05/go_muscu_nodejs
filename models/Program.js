const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nom obligatoire
  },
  description: {
    type: String,
    required: true, // Description obligatoire
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId, // Référence aux exercices
      ref: 'Exercise', // Modèle référencé
    },
  ],
  rest: {
    type: String, // Temps de repos en secondes
    required: true, // Obligatoire
    default: "60", // Par défaut 60 secondes
  },
  nbRep: {
    type: Number, // Nombre de répétitions
    required: true, // Obligatoire
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

programSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
