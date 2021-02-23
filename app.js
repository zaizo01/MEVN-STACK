const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// routes
// app.get('/', (req, res) => {
//     res.send('Hello World xd')
// })

// Middleware for Vue.js router mode history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), function(){
    console.log('Liste port 3000');
})