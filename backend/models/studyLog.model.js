const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studyLogSchema = new Schema({

	todaysDate:{
		type: Date,
	},
	description:{
		type:String,
		trim:true,
	},
	emojiForDay:{
		type:String,
	},
	qualityOfSleep:{
		type:String,
	},
	numberOfBreaks:{
		type:Number,
	},
	studyTime:{
		type:String,
	}

},{
	timestamps:true,
});
const StudyLog = mongoose.model("StudyLog",studyLogSchema);
module.exports = StudyLog;