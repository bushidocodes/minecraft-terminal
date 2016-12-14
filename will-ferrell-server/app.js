var express = require('express');
var app = express();
const morgan = require('morgan');
const fs = require('fs');
const data = './DB/WFQuotes.txt';

app.use(morgan('↓ received :method :url · responded :status :res[Content-Type]'));

app.get('/', function(req, res, next) {
    const willFQ = fs.readFileSync('./DB/WFQuotes.txt').toString();
    let quoteArray = willFQ.split('\n')
    let max  = quoteArray.length;
    let min = 0;
    let randomNum = Math.floor(Math.random() * max);
    res.send(quoteArray[randomNum]);
});

app.listen(3000, function() {
    console.log('I don\'t know if you heard me counting, I\'m on port 3000');
});