module.exports = function (rego, state, nightmare) {
    // console.log("Checkrego_Start...");

    let state_num = 2;
    switch (state) {
    case "QLD":
        state_num = 1;
        break;
    case "NSW":
        state_num = 2;
        break;
    case "ACT":
        state_num = 3;
        break;
    case "SA":
        state_num = 4;
        break;
    case "VIC":
        state_num = 5;
        break;
    case "TAS":
        state_num = 6;
        break;
    case "WA":
        state_num = 7;
        break;
    case "NT":
        state_num = 8;
        break;

    default:
        state_num = 2;
    }

    let url = "https://checkrego.com.au";
    return nightmare
      .goto(url)
      .wait('#rego')
      .type('#rego', rego)
      .wait('button.btn.dropdown-toggle.bs-placeholder.btn-default')
      .evaluate(state_num => {
        document.getElementById("state").options[state_num].selected = true;
      }, state_num)
      .click('#search')
      .wait('.list-group')
      .evaluate(function(){
        return [document.querySelector('.list-group strong').innerText, document.querySelector('.list-group small').innerText];
      })
      .end()
      .then(data => {
        // console.log(data);
        return data; // a value needed
      })
      .catch(error => {
        console.error('Search failed:', error)
      })
}