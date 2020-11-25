const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');

//reading and converting csv row to json
class PayrollInputCSV extends parse.Parser {
    constructor(filename) {
        super({delimiter: ','});

        // file -> parser -> transformation
        this._pipe = fs.createReadStream(filename)
            .pipe(this)
            .pipe(transform(function(record, callback){
                // Converts to an appropriate format
                callback(null, {
                    name : record[0],
                    // empId : parseInt(record[2]),
                    basic : parseInt(record[1]),
                    allowance : parseInt(record[2]),
                    IT: parseInt(record[3]),
                    standardDeduction: parseInt(record[4]),
                    PF: parseInt(record[5]),
                    payPeriod : record[6],
                    
                });
            }));
    }

    pipe(destination, options) {
        return this._pipe ? this._pipe.pipe(destination, options) : super.pipe(destination, options);
    }
}

module.exports = { PayrollInputCSV : PayrollInputCSV };