//密码加密模块
let CryptoJS = require('crypto-js');
let axios = require('axios');
let request = require('request');
let qs = require('qs');
//登陆post地址
let url = 'https://www.oschina.net/action/user/hash_login?from=';
//登陆的用户邮箱和密码
let user = {
    email: '15705512354',
    pwd: 'mm518147',
};
//登陆post的所有数据
let datas = {
    email: user.email,
    pwd: CryptoJS.SHA1(user.pwd).toString(),
    verifyCode: '',
    save_login: 1,
};
//设置头部
let headers = {
    'content-type': 'application/x-www-form-urlencoded',
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
};

const options = {
    method: 'POST',
    headers: headers,
    data: qs.stringify(datas),
    url: url,
};


var instance = axios.create({
    baseURL: 'https://www.oschina.net',
    timeout: 1000,
    headers: headers,
    withCredentials: true,
});

instance.post("/action/user/hash_login?from=", qs.stringify(datas)).then((response) => {
    console.log(response)
    instance.get("/", {
        headers: {
            'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
            Cookie: response.headers['set-cookie'], //这里是登陆后得到的cookie,(重点)
        },
        withCredentials: true,
    }).then((response) => {

        console.log('是否登陆成功：', response.data.indexOf('狂奔的蜗牛lj') > 0);
    })
});

