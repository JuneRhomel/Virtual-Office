const { express, hashData, connection, jwt, encrypt } = require('../../config/common');
const router = express.Router();
const app = express();
app.use(express.json());
require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        if (!data.password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Bad Request',
                error: 'Missing username or password',
                data: data

            });
        }
        if (!data.password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Bad Request',
                error: 'Missing password'
            });
        }
        data.password = hashData(data.password);

        const login = () => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM `_user` WHERE email = ? and status = 1 and deletedBy = 0', data.email, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                });
            });
        }

        let results = await login();
        results = results.pop()
        Promise.all([login()]).then(() => {
            if (results.length === 0) {
                res.status(404).send(
                    {
                        status: 404,
                        success: false,
                        message: 'Not Found',
                        error: 'User not found'
                    }
                );
                return;
            }
            if (results.password !== data.password) {
                res.status(400).send(
                    {
                        status: 400,
                        success: false,
                        message: 'Bad Request',
                        error: 'Wrong password'
                    }
                );
                return;
            }
            const ACCESS_TOKEN = jwt.sign(results.email, process.env.ACCESS_TOKEN_SECRET);
            if(ACCESS_TOKEN) {
                const query = `UPDATE _user SET token = '${ACCESS_TOKEN}' WHERE id = ${results.id}`;
                connection.query(query, (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                })
                res.set('Authorization', `Bearer ${ACCESS_TOKEN}`).status(200).json({
                    status: 200,
                    id:  encrypt(results.id),
                    email: results.email,
                    success: true,
                    message: 'Success',
                    data: results.password === data.password,
                    token: ACCESS_TOKEN,
                })
            }
        })



    } catch (error) {
        res.status(500).send(
            {
                status: 500,
                success: false,
                message: 'Try Again',
                error: error,
                data: req.body
            }
        );
    }
})
module.exports = router;