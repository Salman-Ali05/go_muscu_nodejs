const mongoose = require('mongoose');

const userPerfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur
    ref: 'User', // Modèle User référencé
    required: true, // Obligatoire
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'exercice
    ref: 'Exercise', // Modèle Exercise référencé
    required: true, // Obligatoire
  },
  maxKg: {
    type: Number, // Poids maximal soulevé (en kg)
    required: true, // Obligatoire
  },
  maxRep: {
    type: Number, // Nombre maximal de répétitions
    required: true, // Obligatoire
  },
  date: {
    type: Date, // Date de la performance
    default: Date.now, // Par défaut, la date actuelle
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

userPerfSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserPerf = mongoose.model('UserPerf', userPerfSchema);

module.exports = UserPerf;
