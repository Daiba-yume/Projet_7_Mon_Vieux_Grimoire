// Importation des modules
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Définition du schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Plugin mongoose-unique-validator pour gérer les contraintes d'unicité
userSchema.plugin(uniqueValidator);

// Exportation du modèle User basé sur le schéma défini
module.exports = mongoose.model("User", userSchema);
