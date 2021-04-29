module.exports = function (rego, nightmare) {
    console.log("MyServiceNSW_Start...");
    let url = 'https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details';
    return nightmare
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
                  document.querySelector('div[bold-label-value="display.model.registrationExpiryDate | date:\'dd MMMM yyyy\'"] div[ng-show="to.boldLabelValue"] strong').innerText,
                  document.querySelector('div[bold-label-value="display.model.ctpDetails.CTPExpiryDate | date:\'dd/MM/yyyy\'"] div[ng-show="to.boldLabelValue"] strong').innerText];
      })
      .end()
      .then(data => {
        // console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Search failed:', error)
      })
}