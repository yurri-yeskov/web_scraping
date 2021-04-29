module.exports = function (rego, state, nightmare) {
    // console.log("Carhistory_Start...");

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

    let url = "https://www.carhistory.com.au/";
    return nightmare
      .goto(url)
      .wait('#RegoNumber2')
      .type('#RegoNumber2', rego)
      .wait(500)
      .evaluate(state_num => {
        document.getElementById("RegoState2").options[state_num].selected = true;
      }, state_num)
      .type('#RegoNumber2', '\u000d')
      .wait('#hdnVin')
      .evaluate(function(){
        return document.getElementById('hdnVin').value;
      })
      .end()
      .then(data => {
        // console.log(data);
        return data; // a value needed
      })
      .catch(error => {
        console.error('Search failed:', error);
      })
}