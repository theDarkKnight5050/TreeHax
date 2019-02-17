'use strict';


var mongoose = require('mongoose'),
    Bias = mongoose.model('Bias');

exports.findUrl = async function(req, res) {
    var foundStuff = await Bias.find({url: req.body.url});
    res.send(foundStuff);
};

exports.findBais = async function(req, res) {
    var foundStuff = await Bias.find({bias: req.body.bias, rating: "VERY HIGH"});
    res.send(foundStuff);
};


exports.create = function (req, res) {
    var newBais = new Bias(
        {
            url: req.body.url,
            bias: req.body.bias,
            rating: req.body.rating
        }
    );
    newBais.save(function(err, newBais) {
        if (err) res.send(err);
        res.json(newBais);
    });

};

exports.seed = function (req, res) {
    let urls = require('./csources.json');
    for(var key in urls) {
        var newBais = new Bias({
            url: key,
            bias: urls[key].b,
            rating: urls[key].r
        });
        newBais.save(function(err, newBais) {
            if (err) res.send(err);
            console.log(newBais);
        });
    }
    res.send("done!")
};