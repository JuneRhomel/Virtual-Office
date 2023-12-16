const {
  express,
  hashData,
  encrypt,
  decrypt,
  connection,
} = require("../../config/common");
const router = express.Router();
const app = express();
const cookieJwtAuth = require("../auth/auth");
app.use(express.json());

router.post("/", cookieJwtAuth, (req, res) => {
  try {
    const id = decrypt(req.body.id)
    res.status(200).send(
        {id : id}
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Try Again",
      error: error,
    });
  }
});

module.exports = router;
