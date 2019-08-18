const request = require("request");
const User = require("../../node-mysql/model/user");

var xburl = 'http://120.78.205.51:7070/xiaobing/orderTypes';

// 发送Get请求
// 第一个参数:请求的完整URL,包括参数
// 第二个参数:请求结果回调函数,会传入3个参数,第一个错误,第二个响应对象,第三个请求数据
if (require.main == module) {
    request({
            url: xburl,
            method: "GET",
            json: true,
            headers: {
                "content-type": "application/json",
            }, body: null
        },
        function (error, response, data) {
            if (!error && response.statusCode == 200) {
                let count = 0;
                for (item of data) {
                    for (let i = 0; i < 1000; i++) {
                        User.create({
                            firstName: item.orderTypeName,
                            lastName: 'lmm'
                        });
                        count++;
                        console.log(count);
                    }
                }
                ;
            }


        });
}
