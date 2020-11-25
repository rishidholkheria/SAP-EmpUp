import React from "react";
import "./Payroll.css";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";

const Payroll = () => {
  return (
    <div className="payroll_portal">
      {/* <div className="update_portal_header">
        <div className="update_icon">
          <AccountBalanceWalletIcon />
        </div>
        <h2 className="update_portal_heading">Finance Feed</h2>
      </div> */}
      <div className="finance_detail">
        <div className="fin_info_box">
          <div className="total_emp_pay">
            <p className="net_pay">Net Pay</p>
            <h4>₹ 12,08,201.00</h4>
          </div>
          <div className="payment_date">
            <p className="pay_date">Payment Date</p>
            <h4>30/11/2020</h4>
          </div>
          <button className="view_more_fin_btn">View More</button>
        </div>
        <div className="fin_notice">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia illo
            veritatis fugit, tempore eveniet beatae modi recusandae
          </p>
        </div>
      </div>
      <div className="deduction_summary">
        <div className="deduction_header">Deduction Summary</div>
        <div className="deduction_summary_cards">
          <div className="deduction_details">
            <div className="epf">
              <div className="epf_icon">
                <EcoOutlinedIcon fontSize="large" color="secondary" />
              </div>
              <div className="epf_word_one">EPF</div>
              <div className="epf_amount_one">₹ 12,08.00</div>
            </div>
            <div className="epf">
              <div className="epf_icon">
                <SecurityOutlinedIcon fontSize="large" color="primary" />
              </div>
              <div className="epf_word_two">ESI</div>
              <div className="epf_amount_two">₹ 12,08.00</div>
            </div>
            <div className="epf">
              <div className="epf_icon">
                <HowToRegIcon fontSize="large" color="secondary" />
              </div>
              <div className="epf_word_three">TDS DEDUCTION</div>
              <div className="epf_amount_three">₹ 12,08.00</div>
            </div>
          </div>
          <div className="active_emp">
            <div className="active_emp_header">
              <p>Active Employees</p>
            </div>
            <div className="empno">
              <h2>200</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
