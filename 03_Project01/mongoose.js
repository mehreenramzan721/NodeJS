const app = express();
app.use(express.json());
const PORT = 8622;

const userRouter = require('./routes/user');

const {connectToMongoDB} = require('./connection');
const {logReqRes} = require('./middlewares'); 

// mongoose connection
connectToMongoDB('mongodb://127.0.0.1:27017/Project1');


app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));
// router connect
app.use('/user', userRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });