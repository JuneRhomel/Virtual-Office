const { express, hashData, connection } = require('../../config/common');
const router = express.Router();
const cookieJwtAuth = require("../auth/auth");
const app = express();
app.use(express.json());

router.post('/', (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (!data.password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Bad Request',
                error: 'Password'
            });
        }
        const password = hashData(data.password);
        
        const confirm_password = hashData(data.confirm_password);
        if (password !== confirm_password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Bad Request',
                error: 'Passwords do not match'
            });
        }
        data.password = password;
        delete data.confirm_password;

        const insertUser = () => {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO `_user` SET ?', data, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
            });
        }

        Promise.all([insertUser()]) 
            .then(() => {
                res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'User Created'
                });
            })
            .catch((err) => {
                res.status(500).send({
                    status: 500,
                    success: false,
                    message: 'Try Again',
                    error: err
                });
            })

    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                success: false,
                message: 'Try Again',
                error: error
            }
        );
    }
});
module.exports = router;