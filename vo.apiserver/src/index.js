const { express, connection, hashData } = require('./config/common');
const app = express();
const mainRouter = require('./api/router/router'); // Update the path as needed
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.use('/', mainRouter);
app.listen(3000, () => {
    console.log('Server running on port 3000')
})