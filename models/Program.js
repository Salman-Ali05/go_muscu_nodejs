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
