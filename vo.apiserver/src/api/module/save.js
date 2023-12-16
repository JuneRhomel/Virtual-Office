const {
  express,
  hashData,
  encrypt,
  decrypt,
  getUserByEmail,
  connection,
} = require("../../config/common");
const router = express.Router();
const app = express();
const cookieJwtAuth = require("../auth/auth");
app.use(express.json());


router.post("/:table", cookieJwtAuth, async (req, res) => {
 
  try {
    const data = req.body;
    const table = req.params.table;
    data.createdBy =  await getUserByEmail(req.user)
    const insert = () => {
      return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    Promise.all([insert()])
      .then(() => {
        res.status(200).send({
          success: true,
          message: "Record Saved",
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message: "Try Again",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Try Again",
      error: error,
    });
  }
});

router.put("/:table", cookieJwtAuth, async (req, res) => {
  try {
    const data = req.body;
    const id = req.body.id;
    const table = req.params.table;
    delete data.id;
    if (table === "attendance") {
      data.user_id = decrypt(data.user_id);
    }

    const update = () => {
      return new Promise((resolve, reject) => {
        connection.query(
          `UPDATE ${table} SET ? WHERE id = ?`,
          [data, id],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    };

    const online = (e) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `UPDATE _user SET is_online = ? WHERE id = ?`,
          [0, e],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    };

    await update();

    if (table === "attendance") {
      await online( data.user_id );
    }

    res.status(204).send(); // No Content for success
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Try Again",
      error: error,
    });
  }
});

module.exports = router;
