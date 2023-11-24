const mongoose = require("mongoose");

const PASSWORD = "MRKbbutD6BwWSKPW";
const USER = "daibabnm";
const DB_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.g5bprjg.mongodb.net/?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (e) {
    console.error(e);
  }
}
connect();

module.exports = {}; // Correction ici
