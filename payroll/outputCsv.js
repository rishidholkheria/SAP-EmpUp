const fs = require('fs');
const stringify = require('csv-stringify');
const stream = require('stream');


/**
 * Writes information into the CSV file
 *
 * Input format:
 *      firstName, lastName, annualSalary, superRate, payPeriod,
 *      payPeriod, grossIncome, incomeTax, netIncome, superIncome
 */
//writes to csv
class PayrollOutputCSV extends stream.Transform {
    constructor(filename) {
        super({ objectMode: true });

        this._file = fs.createWriteStream(filename);
    }

    _transform(data, encoding, callback) {
        let input = [[
            data.name,
            // data.empId,
            data.payPeriod,
            data.grossIncome,
            data.PF,
            data.TDS,
            data.ESI,
            data.incomeTax,
            data.netIncome
        ]];

        stringify(input, (err, output) => {
            this._file.write(output);
            callback(null, data);
        });
    }
}

module.exports = { PayrollOutputCSV : PayrollOutputCSV };