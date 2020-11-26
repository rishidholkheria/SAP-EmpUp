const payroll = require('./calculation');
const reader = require('./inputCsv');
const writer = require('./outputCsv');
const writer_screen = require('./outputStream');
const csv = require('csvtojson/v2');
const _ = require('lodash')

const payroll1 = (req,res,next)=>{
// Streams

let inputStream = new reader.PayrollInputCSV(__dirname + "/../samples/input/sample01.csv");
let outputStream = new writer.PayrollOutputCSV(__dirname + "/../samples/output/sample01.csv", req);
let outputStream2 = new writer_screen.PayrollOutput();
let transformer = new payroll.Payroll();


// req = outputStream.getPayroll();

// Error handlers
inputStream.on('error', function(err){
    console.log('Mistake in the input: ', err.message);
});

outputStream.on('error', function(err){
    console.log('Mistake in the csv output: ', err.message);
});

outputStream2.on('error', function(err){
    console.log('Mistake in the json output: ', err.message);
});

transformer.on('error', function(err){
    console.log('Mistake in transformations: ', err.message);
});

inputStream
    .pipe(transformer)
    .pipe(outputStream)
    .pipe(outputStream2)
;

// csv()
// .fromFile(__dirname + '/../samples/output/sample01.csv')
// .then((jsonData)=>{
//     console.log(jsonData);
//     req.payroll = jsonData;
// });

// var Converter = require("csvtojson").Converter;
// var converter = new Converter({});
// converter.fromFile(__dirname + "/../samples/output/sample01.csv",function(err,result){ 
//   console.log(result);
// });


next();
}

module.exports = payroll1;