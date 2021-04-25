const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

let flag = 0;

////////////////////////////////////////////////////////////////////////////////////////
let repo_val = "cc12du";


function setFlag(){
    if(flag ==0)
        flag = 1;
}

function axios_post(data) {

      
      let options = {
        headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'application/json',
        'Host' : 'my.service.nsw.gov.au',
         'Accept' : '*/*',
         'X-Requested-With': 'XMLHttpRequest',
         'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
         'Accept-Encoding': 'gzip, deflate, br',
         'Accept-Language': 'en,en-US;q=0.9',
          'Referer': 'https://my.service.nsw.gov.au/MyServiceNSW/index'
        }

      };

      let post = axios.post('https://my.service.nsw.gov.au/MyServiceNSW/apexremote', data, options);
      return post;
}


axios.get("https://my.service.nsw.gov.au/MyServiceNSW/index#/rms/freeRegoCheck/details")
    .then(res => {        
        
        let init_data = res.data;

        let res_data = init_data;
		let v1 = "encryptedIpAddress', '";
		let pos1 = res_data.indexOf(v1);            
		let pos2 = res_data.indexOf("');", pos1 + 1);		
		let ip = "\"" + res_data.substr(pos1 + 22, pos2 - pos1 - 22) + "\"";
       
        res_data = init_data;
		v1 = 'requestFEService';
		pos1 = res_data.indexOf(v1);            
		pos2 = res_data.indexOf("csrf", pos1 + 1);
		pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
		let data1 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
       
        v1 = 'isAuthenticated';  
        res_data = init_data;          
        pos1 = res_data.indexOf(v1);
        pos2 = res_data.indexOf("csrf", pos1 + 1);
        pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
        let data2 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
        
        v1 = 'isLinkedWithRMS';  
        res_data = init_data;          
        pos1 = res_data.indexOf(v1);
        pos2 = res_data.indexOf("csrf", pos1 + 1);
        pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
        let data3 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
       
        v1 = 'hasRMSEmail';  
        res_data = init_data;          
        pos1 = res_data.indexOf(v1);
        pos2 = res_data.indexOf("csrf", pos1 + 1);
        pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
        let data4 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
       
        v1 = 'createRMSTransaction';  
        res_data = init_data;          
        pos1 = res_data.indexOf(v1);
        pos2 = res_data.indexOf("csrf", pos1 + 1);
        pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
        let data5 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
        
        v1 = 'postVehicleListForFreeRegoCheck';  
        res_data = init_data;          
        pos1 = res_data.indexOf(v1);
        pos2 = res_data.indexOf("csrf", pos1 + 1);
        pos3 = res_data.indexOf("\"},{\"name", pos2 + 1);
        let data6 = "\"" + res_data.substr(pos2 + 7, pos3 - pos2 - 7) + "\"";
        

         /*-------------------------------------------*/
         // v1 = 'requestFEService';  

        let data = ({
            "action":"CommandAndControl",
            "method":"requestFEService",
            "data":["{\"action\":\"SNSW_GET_LINKED_ACCOUNTS\"}"],
            'type': 'rpc',
            "tid":2,
            "ctx":{"csrf":data1,"vid":"06690000005lUNp","ns":"","ver":35}
        })
        let post = axios_post(data);
        post.then((res) => {           
            //console.log('Body: ', res.data);

            /*-------------------------------------------*/
            // v1 = 'isAuthenticated';  
            data = ({
                "action":"UserService",
                "method":"isAuthenticated",
                "data": null,
                'type': 'rpc',
                "tid":3,
                "ctx":{"csrf":data2,"vid":"06690000005lUNp","ns":"","ver":34}
            })
            post = axios_post(data);
            post.then((res) => {               
               // console.log('Body: ', res.data);
                
                /*-------------------------------------------*/
                // v1 = 'isLinkedWithRMS';  
                data = ({
                    "action":"RMSTransactionService",
                    "method":"isLinkedWithRMS",
                    "data": null,
                    'type': 'rpc',
                    "tid":4,
                    "ctx":{"csrf":data3,"vid":"06690000005lUNp","ns":"","ver":34}
                })
                post = axios_post(data);
                post.then((res) => {
                    // console.log(`Status: ${res.status}`);
                    // console.log('Body: ', res.data);

                    /*-------------------------------------------*/
                    // v1 = 'hasRMSEmail';  
                    data = ({
                        "action":"RMSTransactionService",
                        "method":"hasRMSEmail",
                        "data": null,
                        'type': 'rpc',
                        "tid":5,
                        "ctx":{"csrf":data4,"vid":"06690000005lUNp","ns":"","ver":34}
                    })

                    post = axios_post(data);
                    post.then((res) => {
                        // console.log(`Status: ${res.status}`);
                        // console.log('Body: ', res.data);

                        /*-------------------------------------------*/
                        // v1 = 'createRMSTransaction';  
                        
                        let data1 = "{\"ipAddress\":" + ip + ",\"transactionName\":\"FREEREGCHK\",\"outletNumber\":\"\"}"
                        data = ({
                            "action":"RMSWrapperCtrl",
                            "method":"createRMSTransaction",
                            "data": [data1],
                            'type': 'rpc',
                            "tid":6,
                            "ctx":{"csrf":data5,"vid":"06690000005lUNp","ns":"","ver":34}
                        })
                        
                        post = axios_post(data);
                        post.then((res) => {
                            // console.log(`Status: ${res.status}`);
                            // console.log('Body: ', res.data);     
                            let html = JSON.stringify(res.data);
                            let html1 = JSON.parse(html);                           
                            let transactionToken = html1[0].result.statusObject;
                            
                            /*-------------------------------------------*/
                            // v1 = 'postVehicleListForFreeRegoCheck';  
                            //{"action":"RMSWrapperCtrl","method":"postVehicleListForFreeRegoCheck","
                           // data":["{\"transactionToken\":\"3057b3c3-7442-49a2-9215-64d690dd3793\",\"plateNumber\":\"cc12du\"}"],"type":"rpc","tid":7,"ctx":{"csrf":"VmpFPSxNakF5TVMwd05DMHlObFF3TmpveE56b3hPUzQzT1RsYSxiM3JqOWs0bGY3SjBJUXd4Z05DWmFhLFptTTVOREJo","vid":"06690000005lUNp","ns":"","ver":34}}
                            data1 = "{\"transactionToken\":\"" + transactionToken + "\",\"plateNumber\":\"" + repo_val + "\"}";
                            data = ({
                                "action":"RMSWrapperCtrl",
                                "method":"postVehicleListForFreeRegoCheck",
                                "data": [data1],
                                'type': 'rpc',
                                "tid":7,
                                "ctx":{"csrf":data5,"vid":"06690000005lUNp","ns":"","ver":34}
                            })

                            post = axios_post(data);
                            post.then((res) => {
                                // console.log(`Status: ${res.status}`);
                                // console.log('Body: ', res.data);     
                                html = JSON.stringify(res.data);
                                html1 = JSON.parse(html);     
                                
                                let bodyShape = html1[0].result.statusObject.vehicle.bodyShape;
                                let manufacturer = html1[0].result.statusObject.vehicle.manufacturer;
                                let manufactureYear = html1[0].result.statusObject.vehicle.manufactureYear;
                                let model = html1[0].result.statusObject.vehicle.model;
                                let vehicleColour = html1[0].result.statusObject.vehicle.vehicleColour;
                                let vinNumber = html1[0].result.statusObject.vehicle.vinNumber;

                                console.log(manufactureYear, ' ', vinNumber, ' ', bodyShape, ' ', model, ' ', vehicleColour);
                                
                            }).catch((err) => {
                                console.error(err);
                            });
                            
                        }).catch((err) => {
                            console.error(err);
                        });

                    }).catch((err) => {
                        console.error(err);
                    });
                }).catch((err) => {
                    console.error(err);
                });
                
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            console.error(err);
        });


		

		
        
    })
    .catch(err => {
        console.log(err);
    })



return;

