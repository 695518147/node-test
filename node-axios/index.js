const axios = require("axios");

var xburl = 'http://120.78.205.51:7070/xiaobing/orderTypes';

// 发送Get请求
// 第一个参数:请求的完整URL,包括参数
// 第二个参数:请求结果回调函数,会传入3个参数,第一个错误,第二个响应对象,第三个请求数据
(async ()=>{
    if (require.main == module) {

        let ordertypes = await axios.get(xburl);

        JSON.parse(ordertypes).data.for(ordertype=>{
            console.log(ordertype)
        })

    }
})()

