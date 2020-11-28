import React, { useState, useEffect } from "react";
import "./PayrollDetails.css";
import IndPayroll from "./IndPayroll";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

const PayrollDetails = () => {
  const [pData, setPdata] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + "/payroll/data")
      .then((res) => {
        console.log(res.data.data);
        setPdata(res.data.data);

        // setPdata(res.data.data)
        // console.log(pData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(pData);

  return (
    <div className="payrolldetails">
      <Link to="/hroffice" style={{ textDecoration: "none" }}>
        <div className="goBack">
          <BackButton />
        </div>
      </Link>
      <div className="place_ind_payroll">
        {[...pData].map((pay) => (
          <IndPayroll
            netpay={pay.netIncome}
            tds={pay.TDS}
            epf={pay.PF}
            esi={pay.ESI}
            name={pay.Name}
          />
        ))}
        {/* <h1>{pData[0].TDS}</h1> */}
      </div>
    </div>
  );
};

export default PayrollDetails;
