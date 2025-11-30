const express = require('express');
const path = require('path');
const port = 9000;
const db = require('./config/mongoose');
const admin = require('./models/admin');
const events = require('./models/events');
const  app = express();

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
        return res.render('signup',{
            title : "SIGNUP"
        });
      });
app.post('/signup',function (req , res){
   // userId.push(req.body);
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
   // console.log(req.body);
    admin.find({ email : req.body.email})
      .then((admin) => {
        //password to be check(print password from db)
        console.log(admin);
        if(admin.length>0){
            console.log('going to event list');
             return res.redirect('/eventlist');
        }
        else {
            console.log('invalid user');
            return res.redirect('/login');
        }
      }).catch((error) => {
        console.error('error in login',error);
        return res.redirect('/login');
      });
    });
app.get('/login', function (req , res){
    res.render('login',{
        title : "LOGIN"
    });
});
app.get('/eventlist',function(req , res){
    events.find ()
        .then ((List) => {
            console.log(List);
            return res.render('eventlist',{
        title :"EVENTLIST",
        Event_List : List
            });
        }).catch((error) => {
            console.error('error getting list',error);
            return res.redirect('/eventlist');
        });
    });
app.get('/addevent', function (req , res){
    res.render('addevent',{
        title : "ADDEVENT"
    });
});
app.post('/addevent',function(req ,res){
    //eventList.push(req.body);
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
    let event = req.query.event;

    let eventIndex =  eventList.findIndex( program => program.event == event);
    
    let eventPass = eventList[eventIndex];
    return res.render('viewdetails',{
       title : "View Details" ,
        Event_List : eventPass 
    }); 
});
app.listen(port ,function(err){
    if (err){
        console.log('error in running the server ', err);
    }
    console.log('my express server is running on port : ',port);
});

