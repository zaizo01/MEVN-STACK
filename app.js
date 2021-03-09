const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// conection DB
const mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/mevnapp';
const uri = 'mongodb+srv://user-admin:<A6bIEIQ8v30UXxaz>@cluster0.y9kyc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
    () => { console.log('conect DB'); },
    err => { console.log(err); }
);


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// routes
app.use('/api', require('./routes/nota'))

// Middleware for Vue.js router mode history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function(){
    console.log('Liste port 3000');
})