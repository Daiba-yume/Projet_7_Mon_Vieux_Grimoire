const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const compressImage = require("../middleware/sharp-config");
const bookCtrl = require("../controllers/book");

router.get("/", bookCtrl.getAllBook);
router.get("/:id", bookCtrl.getOneBook);
router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:id", auth, multer, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

router.get("/bestrating", bookCtrl.bestRating);
router.post("/:id/rating", auth, bookCtrl.averageRating);

module.exports = router;
