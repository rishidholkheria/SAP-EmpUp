const express = require('express');
const app = express();
const router = express.Router();
const XLSX = require('xlsx');
const genId = require('../utils/random');

convertToJson = function convert(){
    //convert to JSON
    const workbook = XLSX.readFile(__dirname + "Employee.xlsx");
    var sheet_name_list = workBook.SheetNames;
    var json = XLSX.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);

    //adding extra properties
    var i, length;
    length = Object.keys(json).length;
    console.log(length);
    var random = genId(6);
    for(i=0;i<length;i++){
        json[i].password = genId(6),
        json[i].image = "",
        json[i].monthlyGoal = "",
        json[i].todo = "",
        json[i].addOn = "",
        json[i].deduction = "",
        json[i].empId = genId(6)
    } 
    console.log(json);
}

//posting to Database
router.post('/uoload-to-db',(req,res)=>{
    
});