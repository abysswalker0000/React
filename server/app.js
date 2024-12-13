
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');

const reviewRoutes = require('./routes/reviewRoutes');

dotenv.config();
;


require('./config/passport');  

const app = express();
const port = 5000;
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const contactRoutes = require('./routes/contactRoutes');


app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/api/categories', categoryRoutes)
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/reviews', reviewRoutes);
mongoose.connect('mongodb+srv://username:password@indahood.qhmtv.mongodb.net/myDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Google Auth App!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
