const path = require("path");
const config = {
    root: path.resolve(__dirname, '../')
}

module.exports = config;

//测试
(async function(){

    if (require.main = module) {
        console.log(config.root)
    }

})()
