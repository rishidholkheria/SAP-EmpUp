// import React, { useState, useEffect } from "react";
// import ReactDOM from 'react-dom';
// import "./Calendar.css";

// const arrMonth = {
// 	January: 31,
// 	February: 28,
// 	March: 31,
// 	April: 30,
// 	May: 31,
// 	June: 30,
// 	July: 31,
// 	August: 31,
// 	September: 30,
// 	October: 31,
// 	November: 30,
// 	December: 31
// };
// const arrDays = [
// 	"Sunday",
// 	"Monday",
// 	"Tuesday",
// 	"Wednesday",
// 	"Thursday",
// 	"Friday",
// 	"Saturday"
// ];

// class LeftBlock extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { toggle: true, time:"", event:"" };
// 	}
// 	handleClick = () => {
// 		this.handleToUpdate(!this.state.toggle);
// 		this.setState(prevState => ({
// 			toggle: !prevState.toggle
// 		}));
// 	};
// 	handleSubmit= () => {
// 		this.handleToUpdateSubmit(this.state.time, this.state.event);
//     // event.preventDefault();

// 	};
// handleTimeChange= event =>{
// 	    this.setState({time: event.target.value});
// }
// handleEventChange= event =>{
// 		    this.setState({event: event.target.value});

// }
// 	render() {
// 		this.handleToUpdate = this.props.handleToUpdate;
// 		this.handleToUpdateSubmit = this.props.handleToUpdateSubmit;
// 		let h =
// 			(this.props.date.getHours() < 10 ? "0" : "") + this.props.date.getHours();
// 		let m =
// 			(this.props.date.getMinutes() < 10 ? "0" : "") +
// 			this.props.date.getMinutes();
// 		return (
// 			<div className="flip-container-left">
// 				<div className={`flipper ${this.state.toggle ? "" : "toggle"}`}>
// 					<div className="front front-left">
// 						<h2>Today</h2>
// 						<h1>{this.props.date.getDate()}</h1>
// 						<h2>{arrDays[this.props.date.getDay()]}</h2>
// 						<button className="btn btn-flip" onClick={this.handleClick}>
// 							+
// 						</button>
// 					</div>
// 					<div className="back back-left">
// 						<form onSubmit={this.handleSubmit}>
// 							<div className="container-event">
// 								<input
// 									type="text"
// 									className="input-time"
// 									maxlength="5"
// 									placeholder="12:00"
// 									onChange={this.handleTimeChange}
// 								/>
// 								<button className="btn btn-submit">→</button>
// 							</div>
// 							<input
// 								type="text"
// 								className="input-event"
// 								placeholder="Event"
// 								onChange={this.handleEventChange}
// 							/>
// 						</form>
// 						<button className="btn btn-flip" onClick={this.handleClick}>
// 							-
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// class RightBlock extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			firstDay: new Date(
// 				this.props.date.getFullYear() +
// 					"-" +
// 					(this.props.date.getMonth() + 1) +
// 					"-01"
// 			).getDay(),
// 			selectedYear: this.props.date.getFullYear(),
// 			selectedMonth: this.props.date.getMonth(),
// 			selectedDay: this.props.date.getDate()
// 		};
// 	}
// 	updateMonth = event => {
// 		let newMonth = Object.keys(arrMonth).indexOf(event.target.value);
// 		this.handleToUpdateDate(this.state.selectedDay + "/" + newMonth + "/" + this.state.selectedYear);
// 		this.setState({
// 			selectedMonth: newMonth,
// 			firstDay: new Date(
// 				this.state.selectedYear + "-" + (newMonth + 1) + "-01"
// 			).getDay()
// 		});
// 	};
// 	prevMonth = () => {
// 		if (this.state.selectedMonth - 1 < 0) {
// 			this.handleToUpdateDate(this.state.selectedDay + "/" + 11 + "/" + this.state.selectedYear -1);
// 			this.setState(prevState => ({
// 				selectedMonth: 11,
// 				selectedYear: prevState.selectedYear - 1,
// 				firstDay: new Date(prevState.selectedYear - 1 + "-" + "12-01").getDay()
// 			}));
// 		} else {
// 			this.handleToUpdateDate(this.state.selectedDay + "/" + this.state.selectedMonth -1 + "/" + this.state.selectedYear);
// 			this.setState(prevState => ({
// 				selectedMonth: prevState.selectedMonth - 1,
// 				firstDay: new Date(
// 					this.state.selectedYear + "-" + prevState.selectedMonth + "-01"
// 				).getDay()
// 			}));
// 		}
// 	};
// 	nextMonth = () => {
// 		if (this.state.selectedMonth + 1 > 11) {
// 			this.handleToUpdateDate(this.state.selectedDay + "/" +0 + "/" + this.state.selectedYear+1);
// 			this.setState(prevState => ({
// 				selectedMonth: 0,
// 				selectedYear: prevState.selectedYear + 1,
// 				firstDay: new Date(prevState.selectedYear + 1 + "-" + "01-01").getDay()
// 			}));
// 		} else {
// 			this.handleToUpdateDate(this.state.selectedDay + "/" + this.state.selectedMonth + 1+ "/" + this.state.selectedYear);
// 			this.setState(prevState => ({
// 				selectedMonth: prevState.selectedMonth + 1,
// 				firstDay: new Date(
// 					this.state.selectedYear + "-" + (prevState.selectedMonth + 2) + "-01"
// 				).getDay()
// 			}));
// 		}
// 	};
// 	updateYear = event => {
// 		if (event.target.value.length == 4) {
// 			this.handleToUpdateDate(this.state.selectedDay + "/" + this.state.selectedMonth + "/" + event.target.value);
// 			this.setState({
// 				selectedYear: parseInt(event.target.value),
// 				firstDay: new Date(
// 					parseInt(event.target.value) + "-" + (this.state.selectedMonth + 1) + "-01"
// 				).getDay()
// 			});
// 		} else if (event.target.value.length > 0) {
// 			this.setState({
// 				selectedYear: parseInt(event.target.value)
// 			});
// 		}
// 	};
// 	handleClick = event => {
// 		this.handleToUpdateDate(event.currentTarget.dataset.id + "/" + this.state.selectedMonth + "/" + this.state.selectedYear);
// 			this.setState({
// 			selectedDay: parseInt(event.currentTarget.dataset.id)
// 		});
// 	};

// 	getDayBlocks() {
// 		let arrNo = [];
// 		for (let n = 0; n < this.state.firstDay; n++) {
// 			arrNo.push(<div className="day-block" />);
// 		}
// 		for (
// 			let i = 1;
// 			i < Object.values(arrMonth)[this.state.selectedMonth] + 1;
// 			i++
// 		) {
// 			arrNo.push(
// 				<div
// 					data-id={i}
// 					onClick={this.handleClick}
// 					className={`day-block ${i == this.state.selectedDay ? "active" : ""}`}
// 				>
// 					<div className="inner">{i}</div>
// 				</div>
// 			);
// 		}
// 		return arrNo;
// 	}
// 	getEvents(){
// 		let events = [];
// 		let eventsToday = this.props.eventList.filter(event => {
// 			let dateArr = event[0].split('/');
// 			if (dateArr[0] == this.state.selectedDay && dateArr[1] == this.state.selectedMonth && dateArr[2] == this.state.selectedYear){
// 				events.push(<div className="event"><p className="event-time">{event[1]}</p><p className="event-name">{event[2]}</p></div>)
// 			}
// 		})
// 		return events;
// 	}
// 	render() {
// 		this.handleToUpdateDate = this.props.handleToUpdateDate;

// 		const monthOptions = Object.keys(arrMonth).map(month => (
// 			<option
// 				className="option-month"
// 				selected={
// 					month == Object.keys(arrMonth)[this.state.selectedMonth] ? "selected" : ""
// 				}
// 			>
// 				{month}
// 			</option>
// 		));

// 		return (
// 			<div className="flip-container-right">
// 				<div className={`flipper ${this.props.toggle ? "" : "toggle"}`}>
// 					<div className="front front-right">
// 						<div className="container-date-picker">
// 							<button className="btn btn-prev" onClick={this.prevMonth}>
// 								&lt;
// 							</button>
// 							<select className="select-month" onChange={this.updateMonth}>
// 								{monthOptions}
// 							</select>
// 							<input
// 								type="text"
// 								className="input-year"
// 								onChange={this.updateYear}
// 								value={this.state.selectedYear}
// 								maxlength="4"
// 							/>
// 							<button className="btn btn-next" onClick={this.nextMonth}>
// 								&gt;
// 							</button>
// 						</div>
// 						<div className="container-day">
// 							{arrDays.map(day => (
// 								<div className="weekday">{day.substring(0, 3)}</div>
// 							))}
// 							{this.getDayBlocks()}
// 						</div>
// 					</div>
// 					<div className="back back-right">
// 						<div className="container-events">{this.getEvents()} </div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// class Calendar extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		let date = new Date();
// 		this.state = {
// 			date: date,
// 			toggle: true,
// 			eventList: [],
// 			selectedDate: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
// 		};
// 	}

// 	handleToUpdate = isToggle => {
// 		this.setState({ toggle: isToggle });
// 	};
// 	handleToUpdateSubmit = (time, event) => {
// 		this.setState(prevState => {
// 			const list = [...prevState.eventList, [this.state.selectedDate, time, event]];
// 			return {
// 			eventList: list
// 			}
// 		});
// 	};
// handleToUpdateDate = (date) =>{
// 	this.setState({
// 		selectedDate: date
// 	});
// }
// 	componentDidMount() {
// 		this.timerID = setInterval(this.tick, 1000); //refresh each second
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.timerID);
// 	}

// 	tick = () => {
// 		this.setState({
// 			date: new Date()
// 		});
// 	};

// 	render() {
// 		return (
// 			<div className="wrapper">
// 				<LeftBlock date={this.state.date} handleToUpdate={this.handleToUpdate} handleToUpdateSubmit= {this.handleToUpdateSubmit}/>
// 				<RightBlock date={this.state.date} toggle={this.state.toggle} handleToUpdateDate={this.handleToUpdateDate} eventList={this.state.eventList}/>
// 			</div>
// 		);
// 	}
// }
// ReactDOM.render(<Calendar />, document.getElementById("root"));