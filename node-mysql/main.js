const model = require(__dirname + "/model/model");

(async function () {
    if (require.main === module) {
        model.sync(false)
        for (let i = 0; i < 10000; i++) {
            await model.school.create({
                userName: i,
                birthDay: new Date()
            });
            await model.user.create({
                schoolName: "学校" + i
            });

            if((i + 1) % 100 == 0) {
                console.log((i + 1)/10000)
            }
        }

    }
})();
