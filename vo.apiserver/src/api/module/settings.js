const { express, hashData, encrypt, decrypt, connection } = require('../../config/common');
const router = express.Router();
const app = express();
const cookieJwtAuth = require('../auth/auth');
app.use(express.json());

router.get('/', cookieJwtAuth, (req, res) => {
    try {

        connection.query('SELECT * FROM `settings`', (err, results) => {
            if (err) {
                res.status(500).send(
                    {
                        success: false,
                        message: 'Try Again',
                        error: err
                    }
                );
                return;
            }
            results = results.map(item => ({
                ...item,
                enc_id: encrypt(item.id)
            }));
            res.status(200).send(
                results
            );
        })
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: 'Try Again',
                error: error
            }
        );
    }
})

router.post('/', cookieJwtAuth, (req, res) => {
    const data = req.body;

    try {
        const insert = () => {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO settings set ?', data, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        }
        Promise.all([insert()])
            .then(() => {
                res.status(200).send(
                    {
                        success: true, // Changed to 'true' to indicate success
                        message: 'Record Saved',
                    }
                )
            })
            .catch((error) => {
                res.status(500).send({
                    success: false,
                    message: 'Try Again',
                    error: error
                })
            })
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: 'Try Again',
                error: error
            }
        );
    }
})

router.put('/', cookieJwtAuth, (req, res) => {
    const data = req.body;
    const id = req.body.id;
    delete data.id;
    try {
        const update = () => {
            return new Promise((resolve, reject) => {
                connection.query('UPDATE `settings` SET ? WHERE id = ?', [data, id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        }
        Promise.all([update()])
            .then(() => {
                res.status(200).send(
                    {
                        success: true, // Changed to 'true' to indicate success
                        message: 'Record Updated',
                    }
                )
            })
            .catch((error) => {
                res.status(500).send({
                    success: false,
                    message: 'Try Again',
                    error: error
                })
            })
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: 'Try Again',
                error: error
            }
        );
    }
})

router.delete('/', cookieJwtAuth, (req, res) => {
    try {
        const id = req.body.id;
        const dataDelete = () => {
            return new Promise((resolve, reject) => {
                connection.query('UPDATE `settings` SET `deleted` = 1 WHERE `id` = ?', [id], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        }
        Promise.all([dataDelete()]) 
            .then(() => {
                res.status(200).send(
                    {
                        success: true, // Changed to 'true' to indicate success
                        message: 'Record Deleted',
                    }
                )
            })
            .catch((error) => {
                res.status(500).send({
                    success: false,
                    message: 'Error Deleting Record',
                    error: error,
                })
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
})

router.get('/:id', cookieJwtAuth, (req, res) => {
    try {
        let id = req.params.id; // Parse the id parasettings from the URL
        id = decrypt(id)
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid id parasettings',
            });
        }

        const query = 'SELECT * FROM settings WHERE id = ?';

        connection.query(query, [id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Try Again',
                    error: err
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found',
                });
            }
            results = results.map(item => ({
                ...item,
                enc_id: encrypt(item.id)
            }));
            res.status(200).json(results[0]); // Return the first (and only) matching record
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Try Again',
            error: error
        });
    }
});
module.exports = router;