let axios = require('axios');

axios.defaults.withCredentials = true;

//设置头部
let headers = {
    'content-type': 'application/json',
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
};
axios.get("http://localhost:8080/test/2", {withCredentials: true});

// axios({
//     url: "http://localhost:8080/test/2",
//     headers: {
//         'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
//         Cookie: headers, //这里是登陆后得到的cookie,(重点)
//     },
//     withCredentials: true,
//     crossDomain: true,
// }).then((response) => {
//     console.log(response);
// }).catch(error => {
//     console.log(error);
// });

