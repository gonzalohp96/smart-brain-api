const handleRegister = (req,res,db,bcrypt) =>{
	const {email,name,password}=req.body;

	if (!email||!name||!password){
		return res.status(400).json('incorrect form submission');
	}
	// bcrypt.hash(password, 10, function(err, hash) {
	// 	console.log(hash);
	// }); //este es ASYNC el que usamos abajo es SYNC
	const hash = bcrypt.hashSync(password, 10);

	db.transaction(trx=>{
		trx('login')
		.insert({
			hash: hash,
			email: email
		})
		.returning('email')
		.then(loginEmail=>{
			return trx('users')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.returning('*')
			.then(user=>{
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('unable to register'))
}


module.exports = {
	handleRegister: handleRegister
}