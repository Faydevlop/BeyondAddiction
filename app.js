const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const cors = require('cors')

// Load environment variables
dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())



app.get('/',async(req,res)=>{
  res.send('server is running')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
