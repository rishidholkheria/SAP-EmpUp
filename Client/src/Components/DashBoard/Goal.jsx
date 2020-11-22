import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Goal.css";

const Goal = ({ goal }) => {
  return (
    <div className="goal">
      {goal ? <h3>{goal}</h3> : <h3>MONTHLY GOAL TO BE ADDED</h3>}
    </div>
  );
};

export default Goal;
