const stream = require('stream');

//output csv to json
class PayrollOutput extends stream.Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(data, encoding, callback) {
        // const total = Object.keys(data)
        // .map(netIncome => +data[netIncome])
        // .reduce((a,b) => {a+b});
        // var total = data.reduce((x,y) => x + y.netIncome,0);
        // console.log(JSON.stringify(total));
        // console.log(JSON.stringify(data));
        var json = JSON.stringify(data);
        callback(null, data);
    }
}

// console.log(data);

// const result = data.map(a=>Object.values(a)).reduce((a,b)=>parseInt(a)+parseInt(b))
// console.log("result = "+result);

module.exports = { PayrollOutput : PayrollOutput };