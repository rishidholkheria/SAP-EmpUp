const payroll = require('./calculation');
const reader = require('./inputCsv');
const writer = require('./outputCsv');
const writer_screen = require('./outputStream');


// Streams
let inputStream = new reader.PayrollInputCSV(__dirname + "/../samples/input/sample01.csv");
let outputStream = new writer.PayrollOutputCSV(__dirname + "/../samples/output/sample01.csv");
let outputStream2 = new writer_screen.PayrollOutput();
let transformer = new payroll.Payroll();


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