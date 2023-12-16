const { express, hashData, connection } = require('../../config/common');
const router = express.Router();

const loginRouter = require('../auth/login'); 
const registerRouter = require('../auth/register'); 

const settingsRouter = require('../module/settings'); 
const roleRouter = require('../module/role'); 
const usersRouter = require('../module/users'); 
const get_dataRouter = require('../module/get_data'); 
const saveRouter = require('../module/save'); 
const decriptRouter = require('../module/decript'); 

router.use('/login', loginRouter);
router.use('/register', registerRouter);
// router.use('/settings', settingsRouter);
// router.use('/role', roleRouter);
// router.use('/users', usersRouter);
router.use('/get_data', get_dataRouter);
router.use('/save', saveRouter);
// router.use('/decript', decriptRouter);


module.exports = router;
