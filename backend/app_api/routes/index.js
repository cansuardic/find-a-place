var express = require("express");
var router = express.Router();
var ctrlVenues = require("../controllers/VenueController");
var ctrlComments = require("../controllers/CommentController");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const validEmail = "cns";
const validPassword = "cns";
const secretKey = "mysecretkey";

router.use(bodyParser.json());

// Login endpoint'i
router.route("/login").post((req, res) => {
  const { email, password } = req.body;

  if (email === validEmail && password === validPassword) {
    // Kullanıcı adı ve şifre doğrulandı
    const token = jwt.sign({ email: validEmail }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      token: token,
    });
  } else {
    res.status(401).json({ message: "Hatalı kullanıcı adı veya şifre." });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkiniz bulunmamaktadır." });
  }

  const actualToken = token.split(" ")[1];

  jwt.verify(actualToken, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token geçersiz veya süresi dolmuş." });
    }
    next();
  });
};

// Korunan endpoint
router.route("/admin").get(verifyToken, ctrlVenues.listAllVenues);

router
  .route("/venues")
  .get(ctrlVenues.listNearbyVenues)
  .post(ctrlVenues.addVenue);

router
  .route("/venues/:venueid")
  .get(ctrlVenues.getVenue)
  .put(ctrlVenues.updateVenue)
  .delete(ctrlVenues.deleteVenue);

router.route("/venues/:venueid/comments").post(ctrlComments.addComment);

router
  .route("/venues/:venueid/comments/:commentid")
  .get(ctrlComments.getComment)
  .put(ctrlComments.updateComment)
  .delete(ctrlComments.deleteComment);

module.exports = router;
