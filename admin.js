const express = require('express');
const path = require('path');
const port = 9000;
const db = require('./config/mongoose');
const admin = require('./models/admin');
const events = require('./models/events');
const  app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var userId = [] //name ,email, password
var eventList = [ //name , date , time ,venue, coordinator, duration 
    {
        event  : "cultural night",
        date : "13-7-2025",
        time : "12:40 PM",
        venue : "vsb",
        coordinator : "priusha mam",
        duration : "4 hrs"
    },
    {
        event   : "sufi night",
        date   : "20-7-2025",
        time : "03:10 PM",
        venue  : "aruna asif ali hall",
        coordinator : "rashmi pandhey",
        duration : "3 hrs"
    },
    {
        event    : "ramayan act",
        date  : "25-7-2025",
        time : "11:00 PM",
        venue  : "naad",
        coordinator : "rakhi arora",
        duration : "5 hrs"
    },
    {
        event   : "speech competition",
        date  : "7-08-2025",
        time : "11:00 PM",
        venue : "java lab",
        coordinator : "neha sharma",
        duration : "2 hrs"
    }
]
app.get('/signup' , function ( req , res){
    if(!req.cookies.userId){
         return res.redirect('/login');
    }
        return res.render('signup',{
            title : "SIGNUP"
        });
      });
app.post('/signup',function (req , res){
    let createId = { name : req.body.name ,
        email : req.body.email,
        password : req.body.password
    }
    admin.create(createId)
    .then((admin) => {
        console.log('admin created',admin);
        return res.redirect('/login');
    }).catch((error) => {
        console.error('error creating admin ',error);
        return res.redirect('/signup');
    });
});
app.post('/login',function (req , res){
    admin.find({ email : req.body.email})
    .then((admin) => {
        //password to be check(print password from db
         //console.log(admin);
         if(admin.length>0){
            //  password check
            if(admin[0].password==req.body.password){
            res.cookie("userId", admin[0]._id.toString(), {
                httpOnly: true,
                secure: false, // true if HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
              });
            console.log('logged in successfully');
            return res.redirect('/eventlist');
            }
            else {
                console.log('invalid password');
                return res.redirect('/login');
            }
        }
        else {
            console.log('user not found!!');//user not found 
            return res.redirect('/login');
        }
    }).catch((error) => {
        console.error('error in login',error);
        return res.redirect('/login');
    });
});
app.get('/login', function (req , res){
    if(req.cookies.userId){
         return res.redirect('/eventlist');
    }
    res.render('login',{
        title : "LOGIN"
    });
});
app.get('/eventlist',function(req , res){
    if(!req.cookies.userId) {
        return res.redirect('/login')
    }
    events.find ()
    .then ((list) => {
        console.log(list);
        return res.render('eventlist',{
            title :"EVENTLIST",
            Event_List : list
        });
    }).catch((error) => {
        console.error('error getting list',error);
        return res.redirect('/eventlist');
    });
});
app.get('/addevent', function (req , res){
    if(!req.cookies.userId) {
        return res.redirect('/login')
    }
    res.render('addevent',{
        title : "ADDEVENT"
    });
});
app.post('/addevent',function(req ,res){
    let createList = { name : req.body.name,
        date : req.body.date,
        time : req.body.time,
        venue : req.body.venue,
        coordinator : req.body.coordinator,
        duration : req.body.duration
    }
    events.create(createList)
    .then((List) => {
        console.log('list created',List);
        return res.redirect('/eventlist');
    }).catch((error) => {
        console.error('error creating list',error);
        return res.redirect('/addevent');
    });
});
app.get('/delete-contact',function(req , res){
    let id = req.query.id;
    events.findByIdAndDelete(req.query.id).then((List) => {
        return res.redirect('/eventlist');
    }).catch((error) => {
        console.log(error);
        return res.redirect('/eventlist');
    });
});
app.get('/viewdetails', function(req , res){
    if(!req.cookies.userId) {
        return res.redirect('/login')
    }
    //let _id = req.query.id;
    console.log(req.query.id);
    events.find({_id : req.query.id})
    .then((detail) => {
        console.log(detail);
        return res.render('viewdetails', {
            title : "ViewDetails" ,
            Event_List : detail[0]
        });
    }).catch((error) => {
        console.error('error getting detail');
        return res.redirect('/eventlist');
    });
});
app.get('/logout', function (req , res) {
res.clearCookie("userId");
return res.redirect('/login');
});
app.listen(port ,function(err){
    if (err){
        console.log('error in running the server ', err);
    }
    console.log('my express server is running on port : ',port);
});

