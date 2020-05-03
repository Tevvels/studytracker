import React, {Component} from "react";
import{Link} from "react-router-dom";
import axios from "axios";
import * as extraF from '../extrafunctions';

const LogEntry = props => ( 
		<tr className="studyLogEntry studyLogEntry__list ">
			<td><button className="studyLogEntry studyLogEntry__list--item studyLogEntry__list--todayDate collapsible " onClick={()=>{collapse(props.studyLog._id)}}>{props.studyLog.todaysDate.substring(0,10)}</button></td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--description content "+props.studyLog._id}>{props.studyLog.description}</td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--emojiForDay content "+props.studyLog._id}>{props.studyLog.emojiForDay}</td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--qualityOfSleep content "+props.studyLog._id}>{props.studyLog.qualityOfSleep}</td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--numberOfBreaks content "+props.studyLog._id}>{props.studyLog.numberOfBreaks}</td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--studyTime content "+props.studyLog._id}>{props.studyLog.studyTime}</td>
			<td className={"studyLogEntry studyLogEntry__list--item studyLogEntry__list--deleteEdit content "+props.studyLog._id}>
			<Link className = "studyLogEntry studyLogEntry__list--deleteEdit " to={"/update/"+props.studyLog._id}>edit</Link> | <a className= "studyLogEntry__list--editDelete" href="#" onClick={()=>{props.deleteEntry(props.studyLog._id)}}>X</a>
		</td>
	</tr>
)

var collapse = (id)=>{


	var tableItem = document.getElementsByClassName(id);
	extraF.breakThru(tableItem);
}
export default class StudyLog extends Component {
	constructor(props){
		super(props);
		this.deleteEntry =this.deleteEntry.bind(this);
		this.state = {studyLog:[]};
	}
	componentDidMount(){
		axios.get("http://localhost:5000/studyLog/")
		.then(response => {
			this.setState({ studyLog:response.data})
		})
		.catch((error)=>{
			console.log(error);
		})
	}
	deleteEntry(id){
		axios.delete("http://localhost:5000/studyLog/"+id).then(res=>console.log(res.data));
		this.setState({studyLog: this.state.studyLog.filter(el => el._id !== id)
		})
	}
	logList(){
		return this.state.studyLog.map(currentEntry =>{
			return <LogEntry studyLog={currentEntry} deleteEntry={this.deleteEntry} key={currentEntry._id}/>;
		})
	}
	buttonList(){
		return this.state.studyLog.map()
	}	


	render(){

	return(

		<div className="main">
			<div className="header">
				<h3 className="studyLog__title">
					<div className="create__form--div">
						<label className="create__form--label">Study Log</label>
					</div>
				</h3>
				
		
					<Link className  ="studytime__modal--button studytime__modal--studyTime" to="/create" onClick={extraF.startIt} >StudyTime!</Link>
			</div>
			<table className="Entrys">
				<tbody className="Entrys__list">
					{this.logList()}
				</tbody>
			</table>
		</div>

		)
	}
}
