let stream = require('stream');
var extend = require('util')._extend;

//gross pay: basic+allowances
//net pay: gross pay-(deductions+Total TDS)
//BAsic pay: 50% of gross sal (0.5*gross)
//hra 40% basic
//PF 12% of (basic+15000/pf applicable allowance)
//ESI 0.75% of Gross pay  ; Gros pay = (basic+lop dependent allowance/21000)

//Income Tax formula for FY (2020 – 2021) = (Basic + Allowances – Deductions (ESI)) * 12 – (IT Declarations)
//Only ESI is considered as a deduction
//TDS=(Basic + Allowances – Deductions) * 12 – (IT Declarations + Standard deduction)
//

//input: payperiod,firstname,empId,basic,allowance(including hra and others), lop dependent allowance, IT declarations, standard deduction
//output: incme tax, tds, net pay
//input: name,basic, allowance, 
/**
 * Input format:
 *      firstName, lastName, annualSalary, superRate, payPeriod
 *
 * Output format:
 *      firstName, lastName, annualSalary, superRate, payPeriod,
 *      payPeriod               - per calendar month
 *      grossIncome             - annual salary/12 months
 *      incomeTax               - based on the tax table
 *      netIncome               - gross income - income tax
 *      superIncome             - gross income x super rate
 */
class Payroll extends stream.Transform {
    constructor() {
        super({ objectMode: true });
    }

    _transform(data, encoding, callback) {
        let result = Payroll.calculate(data);

        callback(null, result);
    };

    static calculate(data) {
        if (!data) return null;

        let basic = data.basic;
        let allowance = data.allowance;
        let IT = data.IT;
        let standardDeduction = data.standardDeduction;
        let pfAptAll = data.PF

        //calculation of taxes and net pay
        let grossIncome = basic+allowance;
        let ESI;
        if(grossIncome<21000){
            ESI = Math.round(0.0075*grossIncome);
        }
        else{
            ESI = 0.0075*21000;
        }
        
        let PF = 0.12*(basic + pfAptAll);
        let pf;
        if(PF<15000){
            pf = PF;
        }
        else pf = 15000;
        
        let TDS = (basic+allowance-ESI)*12 - (IT+standardDeduction);
        // let netIncome = grossIncome-(ESI+TDS+PF);
        let netIncome = grossIncome - ESI;
        let incomeTax = (basic+allowance-ESI)*12 -(IT);
        
        // // Calculate result
        // let grossIncome = Math.round(annualSalary/12);
        // let incomeTax = Math.round( (taxInfo.taxBase + (annualSalary - taxInfo.min)*taxInfo.taxPerDollar)/12 );
        // let netIncome = grossIncome - incomeTax;
        // let superIncome = Math.round(grossIncome * data.superRate);

        return extend(data, {
            grossIncome : grossIncome,
            incomeTax : incomeTax,
            netIncome : netIncome,
            PF : pf,
            TDS: TDS,
            ESI: ESI
        });
    }
}

module.exports = { Payroll : Payroll };