const Book = require("../models/book");
const fs = require("fs");

// Création d'un livre
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  // suppression de la clé _id et du userId  évite tout modifcation non autorisée
  delete bookObject._id;
  delete bookObject.userId;
  delete bookObject.averageRating;
  delete bookObject.ratings;

  // nouvel objet book en utilisant le modèle Book
  const book = new Book({
    ...bookObject,
    averageRating: 0,
    ratings: [{ userId: req.auth.userId, grade: 0 }],
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename.split(".")[0]
    }compress.webp`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Post saved successfully!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
};

// Obtenir un livre spécifique par son identifiant
exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Modifier un livre existant
exports.modifyBook = (req, res, next) => {
  const { id } = req.params;
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename.split(".")[0]
        }compress.webp`,
      }
    : { ...req.body };

  delete bookObject._userId;
  Book.findById(id)
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        Book.updateOne({ _id: id }, { ...bookObject, _id: id })
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// supprimer un livre existant
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// obtenir tous les livres
exports.getAllBook = (req, res, next) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// définition de la note moyenne
exports.averageRating = (req, res, next) => {
  // définition d'un nouvel objet
  const newRating = {
    userId: req.body.userId,
    grade: req.body.rating,
  };

  // recherche du livre en passant par son id dans la base de données
  Book.findById(req.params.id)
    .then((book) => {
      // vérifie si l'utilisateur à déja noter où non le livre
      if (
        book.ratings.find(
          (rating) => rating.userId.toString() === req.body.userId
        )
      ) {
        return res
          .status(400)
          .json({ message: "Vous avez déjà donné une note à ce livre" });
      } else {
        // Ajout de la nouvelle note aux évaluations du livre
        book.ratings.push(newRating);

        const ratings = book.ratings.map((rating) => rating.grade);
        const sum = ratings.reduce((acc, cur) => acc + cur, 0);
        const average = Math.ceil(sum / ratings.length);
        // Mise à jour de la note moyenne du livre
        book.averageRating = average;
        // Sauvegarde des modifications dans la base de données
        book
          .save()
          .then((book) => res.status(200).json(book))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Récupère les 3 meilleurs livres
exports.bestRating = (req, res, next) => {
  // Recherche des livres triés par note moyenne décroissante
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(401).json({ error }));
};
