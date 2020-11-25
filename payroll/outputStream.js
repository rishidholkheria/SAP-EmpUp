const stream = require('stream');

//output csv to json
class PayrollOutput extends stream.Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(data, encoding, callback) {
        console.log(JSON.stringify(data));
        callback(null, data);
    }
}

module.exports = { PayrollOutput : PayrollOutput };