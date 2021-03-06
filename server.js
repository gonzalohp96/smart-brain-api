const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('it works!!')});
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)});
app.put('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});


app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.PORT?process.env.PORT:3000}`);
})



/*
/--> res=this is working
/signin-->POST=success/fail (si no estamos creando porque usamos post?, porque no queremos enviarlo como querystring, sindo dentro del body y por https)
/register-->POST=user
/profile/:id --> GET = USER
/image-->PUT-->user

*/