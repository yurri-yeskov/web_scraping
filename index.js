// const axios = require('axios');
// const cheerio = require('cheerio');

//////////////////checkrego.com.au///////////////////
const checkrego = require('./checkrego');

Meteor.methods({
    'getCheckRegoData' : function(rego, state){
        const result = checkrego(rego, state);
        console.log("Method return: ", result);
    }
})
//////////////////checkrego.com.au///////////////////

//////////////////carhistory.com.au///////////////////
const carhistory = require('./carhistory');

Meteor.methods({
    'getCarHistoryData' : function(rego, state){
        const result = carhistory(rego, state);
        console.log("Method return: ", result);
    }
})
//////////////////carhistory.com.au///////////////////

//////////////////my.service.nsw.gov.au///////////////////
const myservicensw = require('./myservicensw');

Meteor.methods({
    'getMyServiceNSWData' : function(rego){
        const result = myservicensw(rego);
        console.log("Method return: ", result);
    }
})
return;
//////////////////my.service.nsw.gov.au///////////////////

