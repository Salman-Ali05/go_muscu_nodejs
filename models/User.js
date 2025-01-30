const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  programID: {
      type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur
      ref: 'Program', // Modèle User référencé
      required: true, // Obligatoire
    },
},
  { timestamps: true }); // Ajoute createdAt et updatedAt

const User = mongoose.model('User', userSchema);
module.exports = User;
