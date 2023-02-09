//jshint esversion:6
const ejs=require('ejs');
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const { Schema } = require('mongoose');
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/userDB")
.then(function(){
    console.log("connected");
})

const userSchema=new mongoose.Schema({
    username:String,
    password:String
})
const User=mongoose.model("User",userSchema);





app.get('/login',function(req,res){
    res.render('login');
})
app.get('/',function(req,res){
    res.render('home');
})
app.get('/register',function(req,res){
    

    res.render('register');
})

app.post('/register',function(req,res){
    const NewUser=new User({
        username:req.body.username,
        password:req.body.password
    })
    NewUser.save(function(err){
        if(err){
            console.log(err)
        }else{
        console.log("succesful register")
        }
    })
    res.render('secrets');

})

app.post('/login',function(req,res){
    const Name=req.body.username;
    const pass=req.body.password;
    User.find({username:Name},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data[0].username);
            console.log(data[0].password);
        if(data[0].password==pass){
            res.render('secrets');
        }
    }

    })
    
    
})

app.listen(3000,function(req,res){
    console.log("server is running");
})