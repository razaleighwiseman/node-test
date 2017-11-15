const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
//reuser html code in any html
hbs.registerPartials(__dirname + '/views/partial');
//tell express what view engine to use
app.set('view engine', 'hbs');


//middlewhere.In between process like servlet(maybe)
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + req.method + req.url;
    console.log(now + req.method + req.url)
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('unable to append to server.log')
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// });

//static page html
app.use(express.static(__dirname + '/public'));

//recycle code, call from html.run javascript code inside bs template
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessg: 'welcome to my website',
        //currentTear: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
    //render according to view engine
    res.render('about.hbs', {
        pageTitle: 'About Page yall',
        //currentTear: new Date().getFullYear()
    });
});

app.get('/projects',(req,res) =>{
    res.render('projects.hbs',{
       pageTitle:'Projects' 
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })

});

app.listen(port, () => {
    console.log('server is up and running' + port);
});