import React from "react";
import "./NoticeBoard.css";
import Notice from "./Notice";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  // const orgId = "5fb6916997ad6e18880002aa";

  useEffect(() => {
    const organisationId = localStorage.getItem("orgId");
    axios
      .get(`http://localhost:4000/api/organisation/${organisationId}`)
      .then((res) => {
        // res.data.data.notice.shift();
        setNotices(res.data.data.notice);
        // console.log(res);
        // console.log(res.data.data.notice);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const fetchItems = async () => {
    //   const result = await axios(
    //     `http://localhost:4000/api/organisation/5fb6916997ad6e18880002aa`
    //   );
    //   console.log(result.data.data); //data = What we get from this endpoint
    //   setNotices(result.data.data.notice);
    //   // setisLoading(false);
    // };

    // fetchItems();
  }, []);

  return (
    <div className="notice_board">
      <h3>NoticeBoard</h3>
      <div>
        {[...notices]
          .reverse()
          .slice(0, 5)
          .map((n) => (
            <Notice myNotice={n} />
          ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
