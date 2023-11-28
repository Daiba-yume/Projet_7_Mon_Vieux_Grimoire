const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
