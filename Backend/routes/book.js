// Importation des modules
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const compressImage = require("../middleware/sharp-config");
const bookCtrl = require("../controllers/book");

// Définition des routes pour les opérations CRUD sur les livres
router.get("/bestrating", bookCtrl.bestRating);
router.get("/", bookCtrl.getAllBook);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, compressImage, bookCtrl.createBook);
router.put("/:id", auth, multer, compressImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.averageRating);

module.exports = router;
