const NightMare = require("nightmare");

const carhistory = require("./carhistory");
const checkrego = require("./checkrego");
const myservicensw = require("./myservicensw");

let rego_arr = [
  "AQ36TQ",
  "CC12DU",
  "CY94EF",
  "CC12DU",
  "CPQ13E",
  "CZ13CH",
  "BN56NK",
  "CD06GS",
  "BNB13D",
  "EIK40C",
  "AOW71K",
  "ELT43Q",
  "YPE089",
  "BEJ66U",
  "NBK35B",
  "JN448",
  "CD00EY",
  "BP80AT",
  "DDV17W",
  "ARI20N",
];
let state = "NSW";

let check_rego_data = {};
const getCheckregoData = async (rego, state, nightmare) => {
  check_rego_data[rego] = await checkrego(rego, state, nightmare);
  console.log(check_rego_data[rego]);
};

let car_history_data = {};
const getCarhistoryData = async (rego, state, nightmare) => {
  car_history_data[rego] = await carhistory(rego, state, nightmare);
  console.log(car_history_data[rego]);
};

let car_nsw_data = {};
const getNSWData = async (rego, nightmare) => {
    car_nsw_data[rego] = await myservicensw(rego, nightmare);
  console.log(car_nsw_data[rego]);
};

// getCarhistoryData(rego, state);

let i = -1;

function myLoop() {
  console.log("start");
  setInterval(function () {
    i++;
    if (i < rego_arr.length) {
      const nm_ch = NightMare({ show: false});
      getCarhistoryData(rego_arr[i], state, nm_ch);

    //   const nm_cr = NightMare({ show: false });
    //   getCheckregoData(rego_arr[i], state, nm_cr);

      const nm_nsw = NightMare({ show: false });
      getNSWData(rego_arr[i], nm_nsw);
    } else {
      console.log("end");
      clearInterval(this);
    }
  }, 5000);
}

myLoop();
