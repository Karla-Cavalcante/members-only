
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.use('/admin', adminRoutes);


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
