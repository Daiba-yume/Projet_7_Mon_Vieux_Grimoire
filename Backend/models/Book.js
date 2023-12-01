// Module mongoose pour la gestion de la base de données MongoDB
const mongoose = require("mongoose");

// Schéma de données permetant la création d'un Book
const bookSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, required: true },
});

// Exportation du modèle Book basé sur le schéma défini
module.exports = mongoose.model("Book", bookSchema);
