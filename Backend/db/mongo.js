const mongoose = require("mongoose");

const PASSWORD = process.env.MONGO_PASSWORD;
const USER = process.env.MONGO_USER;
const DB_URL = `mongodb+srv://daibabnm:<password>@cluster0.g5bprjg.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.error("Error connecting to DB:", e);
  }
}

connect();

module.exports = {}; // Correction ici
