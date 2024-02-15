const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());

//view engine 
app.set('view engine', 'ejs' , 'js');
app.use('/recipe_api', express.static(path.join(__dirname, 'recipe_api')));

app.use(express.static(path.join(__dirname, 'recipe_api'), { extensions: ['js'] }));

//database connection
mongoose.
connect(process.env.MONGO_URL)
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
app.get('/recipe', requireAuth, (req, res) => res.render('recipe')); 
app.get('/chicken', requireAuth, (req, res) => res.render('chicken')); 
app.use(authRoutes);