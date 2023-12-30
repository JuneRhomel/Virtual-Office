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

const respone = {
  success: false,
  message: "Try Again",
  error: null,
  length: 0,
  data: null,
};

router.get("/:table", cookieJwtAuth, async (req, res) => {
  try {
    const contition = req.body.contition ? req.body.contition + " and " : "";
    const sort_by = req.body.sort ? req.body.sort : "DESC";
    let table = req.params.table;
    const query = `SELECT * FROM ${table} WHERE ${contition}  deletedBy = 0 ORDER BY id ${sort_by}`;
    connection.query(query, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json((respone.success = false), (respone.error = err));
      }

      if (data.length === 0) {
        return res.status(404).json({});
      }
      data = data.map((item) => ({
        ...item,
        enc_id: encrypt(item.id),
      }));
      data = data.map(({ deletedAt, deletedBy, ...rest }) => ({
        ...rest,
      }));
      
      if (data.length > 0) {
        respone.success = true;
        respone.message = "Success";
        respone.length = data.length;
        respone.data = data;
        res.status(200).json(respone);
      }
    });
  } catch (error) {
    res.status(500).json(respone);
  }
});

router.get("/:table/:id", cookieJwtAuth, async (req, res) => {
  try {
    const contition = req.body.contition ? req.body.contition + " and " : "";
    const sort_by = req.body.sort ? req.body.sort : "DESC";
    let table = req.params.table;
    let id = decrypt(req.params.id);
    const query = `SELECT * FROM ${table} WHERE ${contition}  deletedBy = 0 AND id = ${id} ORDER BY id ${sort_by}`;
    connection.query(query, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json((respone.success = false), (respone.error = err));
      }

      if (data.length === 0) {
        return res.status(404).json({});
      }
      data = data.map((item) => ({
        ...item,
        enc_id: encrypt(item.id),
      }));
      if (data.length > 0) {
        respone.success = true;
        respone.message = "Success";
        respone.length = data.length;
        respone.data = data.pop();
        res.status(200).json(respone);
      }
    });
  } catch (error) {
    res.status(500).json(respone);
  }
});
module.exports = router;
