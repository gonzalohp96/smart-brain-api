const Clarifai = require('clarifai');

const app2 = new Clarifai.App({
 apiKey: 'e30ba7cef213458d9011cf85e2d7050a'
});

const handleApiCall = (req,res)=>{
	app2.models
	 .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	 .then(data =>{
	 	res.json(data);
	 })
	 .catch(err=>res.status(400).json('unable to work with api'))
}


const handleImage = (req,res,db)=>{
	const { id } = req.body;

	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('error getting entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}