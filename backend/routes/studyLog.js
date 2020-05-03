const router = require('express').Router();
let StudyLog = require('../models/studyLog.model');

router.route('/').get((req,res)=>{
	StudyLog.find()
		.then(studyLog => res.json(studyLog))
		.catch(err => res.status(400).json("Error"+ err));
});

router.route('/add').post((req,res)=>{
	const todaysDate = Date();
	const description = req.body.description;
	const emojiForDay = req.body.emojiForDay;
	const qualityOfSleep = req.body.qualityOfSleep;
	const numberOfBreaks = req.body.numberOfBreaks;
	const studyTime = req.body.studyTime;
	const newStudyDay = new StudyLog({
		todaysDate,
		description,
		qualityOfSleep,
		emojiForDay,
		numberOfBreaks,
		studyTime,

	});

	
	newStudyDay.save()
	.then(() => res.json("Study Time Logged"))
	.catch(res => res.status(400).json("Error: "+ err));
});

router.route('/:id').get((req,res)=>{
	StudyLog.findById(req.params.id)
	.then(studyLog=> res.json('studyLog'))
	.catch(err => res.status(400).json("Error: "+ err));
});
router.route('/:id').delete((req,res)=>{
	StudyLog.findByIdAndDelete(req.params.id)
	.then(studyLog=> res.json('Log Deleted'))
	.catch(err => res.status(400).json("Error: "+ err));
});

router.route('/update/:id').post((res,req)=>{
	StudyLog.findById(req.params.id)
	.then(studyLog =>{
		studyLog.todaysDate = Date();
		studyLog.description = req.body.description;
		studyLog.qualityOfSleep = req.body.qualityOfSleep;
		studyLog.emojiForDay = req.body.emojiForDay;
		studyLog.numberOfBreaks = req.body.numberOfBreaks;
		studyLog.studyTime = req.body.studyTime;
		studyLog.save()
			.then(()=>res.json('StudyLog Updated'))
			.catch(err => res.status(400).json("Error: "+err))
	})
	.catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;