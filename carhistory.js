const axios = require('axios');
const cheerio = require('cheerio');

let data = {};

module.exports = function (rego, state) {
    console.log("Carhistory_Start...")
    let url = "https://secure.carhistory.com.au/checkout?frm=CH&rpt=CHPPSR&rego=" + rego + "&state=" + state;
    axios.get(url, {
        headers: {
            Cookie: 'ASP.NET_SessionId=iskfs4zgvtd5eai1mgntdpx2; CarHistoryB2C=frm=CH&rpt=CHPPSR&usemockp2v=&cc=; TS019f711e=011fe472cae151ded12db33dc6a5e2cf5be798ab41e94f79f26891a234f6d2e5996bae0cae01753ea7d1803ed75c6800ca1d5c8c8067f6f8744ac25b5a898cc3b4c825589bf1b514c858a06011dd398b2ea2b97b04'
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
	data["vin_val"] = $("#hdnVin").val();   // a value needed

	console.log("Carhistory_End...");
}