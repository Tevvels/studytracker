import React, {Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as extraF from '../extrafunctions';
import{Link} from "react-router-dom";

export default class LogDay extends Component {


	constructor(props){
		super(props);


		this.onAddDate = this.onAddDate.bind(this);
		this.onAddDescription = this.onAddDescription.bind(this);
		this.onAddEmoji = this.onAddEmoji.bind(this);
		this.onAddQualityOfSleep = this.onAddQualityOfSleep.bind(this);
		this.onAddNumberOfBreaks = this.onAddNumberOfBreaks.bind(this);
		this.onAddStudyTime = this.onAddStudyTime.bind(this);
		this.onSubmit = this.onSubmit.bind(this);


		this.state = {

			todaysDate: new Date(),
			description: " ",
			emojiForDay: " ",
			qualityOfSleep:" ",
			numberOfBreaks:0,
			studyTime:" ",
			studyLog:[],

		}

	}


	onAddDate(todaysDate){
		this.setState({
			todaysDate: new Date()
			
		});
	}

	onAddDescription(e){
		this.setState({
			description: e.target.value
		});
	}

	onAddEmoji(e){
		this.setState({
			emojiForDay: e.target.value
		});
	}

	onAddQualityOfSleep(e){
		this.setState({
			qualityOfSleep: e.target.value
		});
	}

	onAddNumberOfBreaks(){
		extraF.startStop();
		this.setState((prevState)=>{
			return{
				numberOfBreaks: prevState.numberOfBreaks +1 
			}
		});
		
	}

	onAddStudyTime(){
		
		this.setState((prevState)=>{
			return{
				studyTime: prevState.studyTime = extraF.time
			}
		});
	}
	onSubmit(e){
		e.preventDefault();
		console.log("Studied Time Logged");

		const newStudyDay = {
			
			description: this.state.description,
			emojiForDay: this.state.emojiForDay,
			qualityOfSleep: this.state.qualityOfSleep,
			numberOfBreaks: this.state.numberOfBreaks,
			todaysDate: this.state.todaysDate,
			studyTime: this.state.studyTime,

		}
	console.log(newStudyDay);

	axios.post("http://localhost:5000/studyLog/add",newStudyDay).then(res=> console.log(res.data));


		window.location ="/";
	}

	render(){
		return ( 
			<div className="create">
					<div className="studytime__modal " id="studyTimeModal">
					<div className="studytime__modal--content">
					<h3 className="studytime__modal--header" id="studytime__modal--header"> Studying Time!!</h3>
					<p className="studytime__modal--paragraph"> Good Luck</p>

					<button className ="studytime__modal--button studytime__modal--break" id="studytime__modal--break" onClick={ this.onAddNumberOfBreaks}>Break</button>
					<Link className  ="studytime__modal--button studytime__modal--stopLog" id="studytime__modal--stopLog" onClick={extraF.stopIt} to="/create" >Done</Link>
					<span className ="close" onClick={extraF.stopIt}>&times;</span>
					</div>

				</div>
				<form className="create__form" onSubmit={this.onSubmit}>
					<div className="create__form--div create__form--title">
						<h3 className="create__form create__form--title">"todays Study Time"</h3>
						</div>
					 <div className="create__form--div create__description">
					 <label className="create__form--label create__description--label">Description:</label>
					 	<textarea className="create__description--textarea"
					 		   type="text"
					 		   value={this.state.description}
					 		   onChange={this.onAddDescription}
							   />						
					 </div>
					 <div className="create__form--div create__numberOfBreaks">
					 <label className="create__form--label create__numberOfBreaks--label">Did I take any breaks</label>
					 	<input className="create__numberOfBreaks--input"
						 	   id="create__numberOfBreaks--input"
					 		   type="text"
					 		   value={this.state.count}
					 		   onChange={this.onAddNumberOfBreaks}
					 		   />						
					 </div>
					 <div className="create__form--div create__qualityOfSleep">
					 <label className="create__form--label create__qualityOfSleep--label">How did I sleep the night before</label>
					 	<input className="create__qualityOfSleep--input"
					 		   type="text"
					 		   value={this.state.qualityOfSleep}
					 		   onChange={this.onAddQualityOfSleep}
					 		   />						
					 </div>

					 <div className="create__form--div create__emojiForDay">
					 <label className="create__form--label create__emojiForDay--label">How Did I Feel Today:</label>
					 	<input className="create__emojiForDay--input face face__happy"
					 		   type="radio"
					 		   name="faces"
					 		   value="Happy"
					 		   checked
					 		   onChange={this.onAddEmoji}
					 		   />
					 	<input className="create__emojiForDay--input face face__bored"
					 		   type="radio"
					 		   name="faces"
					 		   value="Bored"
					 		   onChange={this.onAddEmoji}
					 		   />
					 	<input className="create__emojiForDay--input face face__sad"
					 		   type="radio"
					 		   name="faces"
					 		   value="Sad"
					 		   onChange={this.onAddEmoji}
					 		   />
					 	</div>
					 					 		   						

	

					 <div className="create__form--div create__submit">
						<input className ="create__submit--input"
					 		 onClick={this.onAddStudyTime}  type="submit" value="Day Logged"/>
					</div>
				</form>
			</div>

		)
	}
}
