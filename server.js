
//node modules
const express = require('express');
const hbs = require('hbs');


//declare node modules
var app = express();
const fs = require('fs');



//middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');





//next exists so you can tell express the middleware function is done. (make database request etc). Middleware wont move on until you call next.
app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));


//handlebars helpers
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


//express routes

app.get('/', (req, res) => {

        res.render('home.hbs', {
            pageTitle: 'Home Page',
            welcomeMessage: 'Welcome to my first Express Site!',
        });
});

app.get('/help', (req, res) => {
    res.render('help.hbs')
});


app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
       
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage: 'Error Handling Request'
    })
});


app.listen(3000, () => {
    console.log('server is up on port 3000');
})



