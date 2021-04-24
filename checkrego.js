const axios = require('axios');
const cheerio = require('cheerio');

let data = {};

module.exports = function (rego, state) {
    console.log("Checkrego_Start...")
    let url = "https://checkrego.com.au/search.php?state=" + state + "&rego=" + rego;
    axios.get(url, {
        headers: {
            Cookie: '__cfduid=dfca305b1cff40b991525fa20387924d51619147539; PHPSESSID=is0u436qthannvs4gstkrnuhl3'
        }
    })
    .then(res => {
        // console.log(res.data);
        getData(res.data);
        return data;
    })
    .catch(err => {
        console.log(err);
    })
}

let getData = html => {
    const $ = cheerio.load(html);
	data["rego_res"] = $(".list-group").find("strong").html();	// a value needed
	data["vin_res"] = $(".list-group").find("small").html();  	// a value needed

	console.log("Checkrego_End...");
}