const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require('./model/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookiekey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 