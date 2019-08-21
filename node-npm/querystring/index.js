let qs = require("qs");







(() => {
    if (require.main == module) {
        let obj = {
            userName: "zpy",
            password: "mm909090"
        }
        let params = qs.stringify(obj);
        console.log(params);
        console.log(qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false }));
        console.log(decodeURI(qs.stringify({ a: ['b', 'c', 'd'] })));
        console.log(qs.parse('w=%D6%D0%CE%C4&foo=bar', null, null))
    }
})();
