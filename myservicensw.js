const axios = require('axios');
const cheerio = require('cheerio');
const NightMare = require('nightmare');

const nightmare = NightMare({ show: false });

module.exports = function (rego) {
    console.log("MyServiceNSW_Start...");
    let url = 'https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
    nightmare
      .goto(url)
      .wait('#formly_2_input_plateNumber_0')
      .type('#formly_2_input_plateNumber_0', rego)
      .wait(500)
      .click('#formly_2_checkbox-label-with-action_termsAndConditions_1')
      .type('#formly_2_input_plateNumber_0', '\u000d')
      .wait('small.ng-binding')
      .evaluate(function(){
          return [document.querySelector('small.ng-binding').innerText, 
                  document.querySelector('small[ng-show="vehicleVinChassis"]').innerText, 
                  document.querySelector('strong[ng-bind-html="to.boldLabelValue | sanitize"]').innerText];
      })
      .end()
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Search failed:', error)
      })
}

// let getData = html => {
//     const $ = cheerio.load(html);
// 	data["rego_res"] = $(".list-group").find("strong").html();	// a value needed
// 	data["vin_res"] = $(".list-group").find("small").html();  	// a value needed

// 	console.log("MyServiceNSW_End...");
// }