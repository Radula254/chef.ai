const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());

//view engine 
app.set('view engine', 'ejs');

//database connection
mongoose.
connect('mongodb+srv://test:test123@cluster0.qktqzjg.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB server")
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000")
    })
}).catch(() => {
    console.log(error, "Failed to connect to the MongoDB server")
});

//routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothie', requireAuth, (req, res) => res.render('smoothie'));  
app.use(authRoutes);