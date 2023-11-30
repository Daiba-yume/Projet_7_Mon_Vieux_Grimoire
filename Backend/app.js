const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
const path = require("path");

const mongoPassword = process.env.MONGODB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://daibabnm:${mongoPassword}@cluster0.g5bprjg.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// Middleware pour analyser les données de requêtes
app.use(express.json());

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

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
