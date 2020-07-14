const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')
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
app.use(express.urlencoded({extended: false}));

//global variables



// routes
app.get('/', (req, res) => {
    res.render('index')
})

// static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;