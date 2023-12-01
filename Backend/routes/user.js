// Importation des modules
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// Définition des routes d'authentification
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// routeur configuré pour l'authentification des utilisateurs
module.exports = router;
