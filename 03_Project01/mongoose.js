const app = express();
app.use(express.json());
const PORT = 8622;

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Project1')
.then(()=>console.log('Connected to MongoDB'))
.catch((err)=>console.error('Error connecting to MongoDB:', err));





app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });