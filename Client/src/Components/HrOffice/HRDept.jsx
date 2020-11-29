import React, { useRef, useEffect } from "react";
import "./HRDept.css";
import { useToasts } from "react-toast-notifications";
import TweetBox from "./TweetBox";
import BookMgt from "./BookMgt";
import PostAddIcon from "@material-ui/icons/PostAdd";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { useState } from "react";
import axios from "axios";
import Payroll from "../Payroll";
require("dotenv").config();

const HRDept = () => {
  const [bookName, setBookName] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookDept, setBookDept] = useState("");
  const [file, setFile] = useState(null);
  const [fileandbook, setFileAndBook] = useState({
    bookId: "",
    fileId: "",
  });
  const [bookDelete, setBookDelete] = useState([]);
  const [notice, setNotice] = useState("");
  const [newgoal, setGoal] = useState("");
  const [disable, setDisabled] = useState(true);
  const [nameError, setNameError] = useState(null);

  const { addToast } = useToasts();

  const organisationId = localStorage.getItem("orgId");
  const monthlyGoal = newgoal;
  const onGoalSend = () => {
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/organisation/monthly-goal/update/${organisationId}`,
        { monthlyGoal }
      )
      .then((res) => {
        console.log(res);
        addToast("Monthly Goal Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        // alert("There is some Unexpected Error!!!");

        addToast("Error in Updating Monthly Goal!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    setGoal("");
    // alert("Monthly Goal Added Successfully!!!");
  };

  const onNoticeSend = () => {
    axios
      .put(
        process.env.REACT_APP_SERVER +
          `/organisation/notices/${organisationId}`,
        {
          notice,
        }
      )
      .then((res) => {
        console.log(res);
        addToast("Notice Board Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        // alert("There is some Unexpected Error!!!");
        addToast("Error in posting Notice!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
    setNotice("");
    // alert("Notice Added Successfully!!!");
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER + `/virtual-library/${organisationId}`)
      .then((res) => {
        // console.log(res);
        setBookDelete(res.data.data);
      });
  }, []);

  const apiOne =
    process.env.REACT_APP_SERVER + "/virtual-library/upload-new-book";
  const apiTwo = process.env.REACT_APP_SERVER + "/virtual-library-file/upload";

  const onAddBook = () => {
    const bName = bookName;
    const bDesc = bookDesc;
    const bDept = bookDept;

    var formData = new FormData();
    formData.append("real-file", file);

    const requestOne = axios.post(apiOne, {
      bName,
      bDesc,
      bDept,
      organisationId,
    });
    const requestTwo = axios.post(apiTwo, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const requestThree = axios.post(apiThree);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread(async (...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          // const responesThree = responses[2];

          console.log("responseOne", responseOne);
          console.log("responseTwo", responseTwo);
          // console.log("responesThree", responesThree);
          console.log(responseTwo.data.file);
          // setBookId(responseOne.data.data._id);
          // setFileId(responseTwo.data.file.id);
          setFileAndBook({
            fileId: responseTwo.data.file.id,
            bookId: responseOne.data.data._id,
          });

          addToast("Book Added to Library!", {
            appearance: "success",
            autoDismiss: true,
          });

          console.log(responseOne.data.data._id);
          console.log(responseTwo.data.file.id);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });

    // alert("Your file has been added to the library!!!");
    setBookName("");
    setBookDesc("");
    setBookDept("");
  };

  useEffect(() => {
    if (fileandbook.bookId !== "" && fileandbook.fileId !== "") {
      axios
        .post(
          process.env.REACT_APP_SERVER +
            "/virtual-library-file/link-file-to-library",
          fileandbook
        )
        .then((res) => {
          console.log(res);
        });
    }
  }, [fileandbook]);

  const firstRender = useRef(true);
  const Input = useRef(null);
  const file_name = useRef(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisabled(validateInfo());
  }, [bookName, bookDept, bookDesc, file]);

  const clickButton = () => {
    Input.current.click();
  };

  const clickFile = (e) => {
    // console.log(e.target.files, "$$$");
    // console.log(e.target.files[0], "$$$");

    let file = e.target.files[0];
    setFile(file);

    if (Input.current.value) {
      file_name.current.innerHTML = Input.current.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      file_name.current.innerHTML = "No file chosen, yet.";
    }
  };

  const validateInfo = () => {
    if (
      bookName === "" ||
      bookDept === "" ||
      bookDesc === "" ||
      !Input.current.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)
    ) {
      setNameError("Fields are empty fill them add to Library.");
      return true;
    } else {
      setNameError(null);
      return false;
    }
  };

  return (
    <div className="chat_portal">
      <div className="hrd__header">
        <h1>HR Department</h1>
      </div>
      <Payroll />
      <div className="update_portal">
        <div className="update_portal_header">
          <div className="update_icon">
            <PostAddIcon />
          </div>
          <h2 className="update_portal_heading">Update Portal</h2>
        </div>
        <div className="update_portal_card">
          <div className="single_card">
            <h4>Add Announcement</h4>
            <div className="tweet_box">
              <TweetBox />
            </div>
          </div>

          <div className="single_card">
            <h4>Add Monthly Goal</h4>
            <div className="monthly_goal_input">
              <textarea
                placeholder="Goal for this Month"
                value={newgoal}
                onChange={(e) => setGoal(e.target.value)}
              ></textarea>
              <div className="mgi_btn">
                <button type="button" onClick={onGoalSend}>
                  ADD
                </button>
              </div>
            </div>
          </div>

          <div className="single_card">
            <h4>Add Notice</h4>
            <div className="notice_input">
              <input
                type="text"
                placeholder="Add Notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              />
              <button type="button" onClick={onNoticeSend}>
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="library_management">
        <div className="library_header">
          <div className="library_icon">
            <LibraryAddIcon />
          </div>
          <h2 className="library_heading">Library Management</h2>
        </div>

        <div className="add_book">
          <h4>Add Book</h4>

          <div className="input_add_book">
            <div className="add_book_inputs">
              <input
                type="text"
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Department"
                value={bookDept}
                onChange={(e) => setBookDept(e.target.value)}
              />
              <textarea
                placeholder="Message"
                value={bookDesc}
                onChange={(e) => setBookDesc(e.target.value)}
              ></textarea>

              <div className="get_book_file">
                <input
                  className="book_file"
                  type="file"
                  placeholder="Book Name"
                  id="real-file"
                  hidden="hidden"
                  onChange={(e) => clickFile(e)}
                  ref={Input}
                />

                <button
                  className="book_file_btn"
                  type="button"
                  id="custom-button"
                  onClick={clickButton}
                >
                  Choose
                </button>
                <span className="file_text" id="custom-text" ref={file_name}>
                  No file
                </span>
              </div>
            </div>

            <div className="add_book_btn_side">
              {nameError ? (
                <p>{nameError}</p>
              ) : (
                <button className="add_book_btn" onClick={onAddBook}>
                  ADD
                </button>
              )}
            </div>
          </div>
        </div>

        {[...bookDelete].reverse().map((dltBook) => (
          <BookMgt
            bookTitle={dltBook.name}
            bookDept={dltBook.department}
            date={dltBook.date}
            bookId={dltBook._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HRDept;
