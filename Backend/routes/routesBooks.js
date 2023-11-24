const express = require("express");
const booksC = require("../controllers/bookController.js");
const router = express.Router;

router.get("/", booksC.getAllBooks);

router.get("/bestrating", booksC.getBestRating);

router.get("/:id", booksC.getBookById);

router.post("/", auth, multer, booksC.addBook);

router.put("/:id", auth, multer, booksC.modifyBook);

router.delete("/:id", auth, booksC.deleteBook);

router.post("/:id/rating", auth, booksC.rateBook);

module.exports = router;
