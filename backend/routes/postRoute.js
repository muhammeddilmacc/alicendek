const express = require("express");
const router = express.Router();
const {
  createPost,
  showPost,
  showSinglePost,
  deletePost,
  updatePost,
  addComment,
  addLike,
  removeLike,
} = require("../controllers/postController");

// custom controllers
const {
  showYazilar,
  showSingleYazi,
  showSiirler,
  showSingleSiir,
  showMakaleler,
  showSingleMakale,
  showGundemeDair,
  showSingleGundemeDair,
} = require("../controllers/postController");

const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {showHakkimda} = require("../controllers/profile.controller");


router.get("/posts/show", showPost);
router.get("/post/:id", showSinglePost);
router.delete("/delete/post/:id", isAuthenticated, isAdmin, deletePost);
router.put("/update/post/:id", isAuthenticated, isAdmin, updatePost);
router.put("/comment/post/:id", isAuthenticated, addComment);
router.put("/addlike/post/:id", isAuthenticated, addLike);
router.put("/removelike/post/:id", isAuthenticated, removeLike);

// user custom routes
router.get("/feed/anasayfa", showPost);
router.get("/feed/yazilar", showYazilar);
router.get("/feed/yazilar/:id", showSingleYazi);
router.get("/feed/siirler", showSiirler);
router.get("/feed/siirler/:id", showSingleSiir);
router.get("/feed/makaleler", showMakaleler);
router.get("/feed/makaleler/:id", showSingleMakale);
router.get("/feed/gundeme-dair", showGundemeDair);
router.get("/feed/gundeme-dair/:id", showSingleGundemeDair);
router.get("/feed/hakkimda", showHakkimda);

module.exports = router;
