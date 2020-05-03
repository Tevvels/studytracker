import React, {Component} from 'react';
import axios from "axios";

export default class EditStudyLog extends Component{

	constructor(props){
		super(props);

		this.onChangeEmoji = this.onChangeEmoji.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state={
			emojiForDay: "",
		}
	}
	componentDidMount(){
		axios.get("http://localhost:5000/studyLog/"+this.props.match.params.id)
		.then(response =>{
			this.setState({
				emojiForDay: response.data.emojiForDay
			})
		})
		.catch((error)=>{
			console.log(error);
		})
		axios.get("http://localhost:5000/studyLog/")
		.then(response =>{
			if(response.data.length > 0){
				this.setState({
					emojiForDay: response.data.map(studyLog => studyLog.emojiForDay),
				})
			}
		})
	}

	onChangeEmoji(e){
		this.setState({
			emojiForDay: e.target.value
		})
	}

	onSubmit(e){
		e.preventDefault();
		console.log("Form Altred:");

		const editStudyLog ={ 
			emojiForDay: this.state.emojiForDay,
		}
		console.log(editStudyLog);
		axios.post("http://localhost:5000/studyLog/update/"+ this.props.match.params.id,editStudyLog).then(res => console.log(res.data));
	
		window.location ="/";
	}
	render(){
		return(
		<div className="edit">
			<h3 className="edit__title"> Feeling Different? </h3>
			<form className="edit__form" onSubmit={this.onSubmit}>
				<div className="edit__div">
					<label className="edit__label">The Days Emotion:</label>
					<input className="edit__input--emoji"
						   type ="text" 
						   // value = {this.state.emojiForDay}
						   onChange = {this.onChangeEmoji}/>
				</div>
				<div className="edit">
				<input type = "submit" value="Edit Emotion"/>
				</div>
			</form>
		</div>
		)
	}

}
