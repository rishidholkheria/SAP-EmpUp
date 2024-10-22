import React, { useEffect, useState } from "react";
import "./Payroll.css";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
require("dotenv").config();

const Payroll = ({ date }) => {
  const [tds, setTds] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [esi, setEsi] = useState(null);
  const [epf, setEpf] = useState(null);
  const [empNumber, setEmpNumber] = useState(null);

  const handleLoop = (response) => {
    var length = response.length;
    console.log(response);
    // setPdata(response);
    // console.log(pData);

    setEmpNumber(length);
    var i;

    var tdsSum = 0;
    var esiSum = 0;
    var epfSum = 0;
    var netIncomeSum = 0;
    for (i = 0; i < length; i++) {
      tdsSum = tdsSum + response[i].TDS;
      esiSum = esiSum + response[i].ESI;
      epfSum = epfSum + response[i].PF;
      netIncomeSum = netIncomeSum + response[i].netIncome;
    }

    setTds(tdsSum);
    setNetIncome(netIncomeSum);
    setEpf(epfSum);
    setEsi(esiSum);
    console.log(tds);
    console.log(tdsSum);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/payroll/data")
      .then((res) => {
        handleLoop(res.data.data);
        console.log(res.data.data);
        // setPdata(res.data.data);
        // console.log(pData);
        // setPdata(res.data.data)
        // console.log(pData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="payroll_portal">
      <div className="finance_detail">
        <div className="fin_info_box">
          <div className="total_emp_pay">
            <p className="net_pay">Net Pay</p>
            <h4>₹ {netIncome}</h4>
          </div>
          <div className="payment_date">
            <p className="pay_date">Payment Date</p>
            <h4>01/12/20</h4>
          </div>
          <Link to="/payrolldetails">
            <button className="view_more_fin_btn">View More</button>
          </Link>
        </div>
        <div className="fin_notice">
          <p>
            This data is about the last payroll update of the organisation. It is the total amount payable to the employees. 
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
              <div className="epf_amount_one">₹ {epf}</div>
            </div>
            <div className="epf">
              <div className="epf_icon">
                <SecurityOutlinedIcon fontSize="large" color="primary" />
              </div>
              <div className="epf_word_two">ESI</div>
              <div className="epf_amount_two">₹ {esi}</div>
            </div>
            <div className="epf">
              <div className="epf_icon">
                <HowToRegIcon fontSize="large" color="secondary" />
              </div>
              <div className="epf_word_three">TDS DEDUCTION</div>
              <div className="epf_amount_three">₹{tds}</div>
            </div>
          </div>
          <div className="active_emp">
            <div className="active_emp_header">
              <p>Active Employees</p>
            </div>
            <div className="empno">
              <h2>{empNumber}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
