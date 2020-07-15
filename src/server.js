const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
//initializations
const app = express();


// settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views')) //now nodes know the location of views 
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method')) //to handle delete in a form

//global variables



// routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
// static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;