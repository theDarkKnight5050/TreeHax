'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BiasSchema = new Schema({
    url: {
        type: String,
        required: 'Kindly enter the name of the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    rating: {
      type: String,
      default: "MIXED"
    },
    bias: {
        type: [{
            type: String,
            enum: ['conspiracy', 'right', 'leftcenter', 'center', 'right-center', 'left', 'fake-news', 'pro-science', 'satire']
        }],
        default: ['center']
    }
});

module.exports = mongoose.model('Bias', BiasSchema);