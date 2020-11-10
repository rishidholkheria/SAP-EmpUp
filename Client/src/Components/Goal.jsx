import React, { useEffect, useState } from "react";
import axios from "axios";

const Goal = ({ goal }) => {
  return (
    <div className="goal">
      <h3>{goal}</h3>
    </div>
  );
};

export default Goal;
