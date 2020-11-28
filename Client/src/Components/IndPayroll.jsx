import React from "react";
import "./IndPayroll.css";

const IndPayroll = () => {
  return (
    <div className="ind_payroll">
      <div className="symbol_side">
        <h1>₹</h1>
      </div>
      <div className="emp_netpay_details">
        <h2>Chinnaswami mutthuswami goswami </h2>
        <p>85,000</p>
        <h3 className="emp_pay_month">April Month</h3>
      </div>
      <div className="emp_payroll_details">
        <div className="single_epf">
          <p className="s_epf">EPF :&ensp;</p>
          <p className="s_epf_pay"> ₹30,000</p>
        </div>
        <div className="single_epf">
          <p className="s_epf">EPF :&ensp;</p>
          <p className="s_epf_pay"> ₹30,000</p>
        </div>
        <div className="single_epf">
          <p className="s_epf">EPF :&ensp;</p>
          <p className="s_epf_pay"> ₹30,000</p>
        </div>
      </div>
    </div>
  );
};

export default IndPayroll;
