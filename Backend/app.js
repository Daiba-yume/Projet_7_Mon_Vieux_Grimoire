const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const { usersRouter } = require("./routes/routesUsers");
//const { booksRouter } = require("./routes/routesBooks");

require("dotenv").config();

const app = express();

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Gestion de la ressource "images" de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", usersRouter);
//app.use("/api/books", booksRouter);

module.exports = app;
