const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du programme est obligatoire.'],
    trim: true, 
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire.'],
    trim: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
  rest: {
    type: String,
    required: false, // Optionnel
    default: "60",
    trim: true,
  },
  nbRep: {
    type: Number,
    required: [true, 'Le nombre de répétitions est obligatoire.'],
    min: [1, 'Le nombre de répétitions doit être au moins 1.'],
  },
  image: {
    type: String,
    required: false, // Optionnel
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Met à jour `updatedAt` à chaque modification
programSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
