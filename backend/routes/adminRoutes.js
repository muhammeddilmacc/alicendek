const express = require("express");
const router = express.Router();

const {
    updateProfile,
    getProfile,
    createPost,
    showAdminYazilar,
    showAdminSiirler,
    showAdminMakaleler,
    showAdminGundemeDair,
    showAdminPosts,
  } = require("../controllers/admin.controller");

  const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.get("/admin/anasayfa", isAuthenticated, isAdmin, showAdminPosts);
router.get("/admin/yazilar", isAuthenticated, isAdmin, showAdminYazilar);
router.get("/admin/siirler", isAuthenticated, isAdmin, showAdminSiirler);
router.get("/admin/makaleler", isAuthenticated, isAdmin, showAdminMakaleler);
router.get("/admin/gundeme-dair", isAuthenticated, isAdmin, showAdminGundemeDair);
router.post("/admin/create-post", isAuthenticated, isAdmin, createPost);
router.put("/admin/profile/update/", isAuthenticated, isAdmin, updateProfile);
router.get("/admin/profile", isAuthenticated, isAdmin, getProfile);

module.exports = router;