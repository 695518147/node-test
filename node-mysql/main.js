const model = require(__dirname + "/model/model");

(async function () {
    if (require.main === module) {
        await model.sync(false);
        for (let i = 0; i < 10000; i++) {
            await model.user.create({
                userName: i,
                birthDay: new Date()
            }).then((promise)=>{
                console.log(promise)
            });
            await model.school.create({
                schoolName: "学校" + i
            }).then((promise)=>{
                console.log(promise)
            });

            if((i + 1) % 100 == 0) {
                console.log((i + 1)/10000)
            }
        }

    }
})();
