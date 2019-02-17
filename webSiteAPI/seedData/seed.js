'use strict';

var mongoose = require('mongoose'),
    Bias = mongoose.model('Bias');

const fs = require('fs');

let rawdata = fs.readFileSync('./csources.json');
let urls = JSON.parse(rawdata);

for(let key in urls) {
    let newBais = new Bias({
        url: key,
        bais: urls.key.b,
        rating: urls.key.r
    });
    newBais.save(function(err, newBais) {
        if (err) res.send(err);
        console.log(newBais);
    });
}

