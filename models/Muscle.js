const mongoose = require('mongoose');

const muscleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Nom obligatoire
    unique: true, // Le nom doit être unique
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

muscleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Muscle = mongoose.model('Muscle', muscleSchema);

module.exports = Muscle;