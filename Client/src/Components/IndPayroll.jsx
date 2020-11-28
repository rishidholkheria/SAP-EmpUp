import React from "react";
import "./IndPayroll.css";

const IndPayroll = ({netpay, epf, esi, tds, name}) => {
  return (
    <div className="ind_payroll">
      <div className="symbol_side">
        <h1>₹</h1>
      </div>
      <div className="emp_netpay_details">
  <h2>{name}</h2>
        <p>{netpay}</p>
        <h3 className="emp_pay_month">April Month</h3>
      </div>
      <div className="emp_payroll_details">
        <div className="single_epf">
          <p className="s_epf">EPF :&ensp;</p>
  <p className="s_epf_pay"> ₹ {epf}</p>
        </div>
        <div className="single_epf">
          <p className="s_epf">ESI :&ensp;</p>
  <p className="s_epf_pay"> ₹{esi}</p>
        </div>
        <div className="single_epf">
          <p className="s_epf">TDS :&ensp;</p>
  <p className="s_epf_pay"> ₹{tds}</p>
        </div>
      </div>
    </div>
  );
};

export default IndPayroll;
