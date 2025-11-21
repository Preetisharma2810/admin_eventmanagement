const express = require('express');
const path = require('path');
const port = 9000;
const  app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/signup' , function ( req , res){
    res.render('signup', {
        title :"signup"
    });
});

app.get('/login', function (req , res){
    res.render('login',{
        title : "login"
    });
});
var eventList = [
    {
        event : "cultural night",
        date : "13-7-2025",
        venue : "vsb"
    },
    {
        event : "sufi night",
        date   : "20-7-2025",
        venue  : "aruna asif ali hall"
    },
    {
        event  : "ramayan act",
        date  : "25-7-2025",
        venue  : "naad"
    },
    {
        event  : "speech competition",
        date  : "7-08-2025",
        venue : "java lab"
    }
]
app.get('/eventlist',function(req , res){
    return res.render('eventlist',{
        title :"EVENT LIST",
        Event_List : eventList
    });
});
app.get('/addevent', function (req , res){
    res.render('addevent',{
        title : "ADDEVENT"
    });
});
app.post('/addevent',function(req ,res){
    eventList.push(req.body);
   return res.redirect('/eventlist');
});
app.get('/delete-contact',function(req , res){
    let event = req.query.event;

    let eventIndex =  eventList.findIndex( program => program.event == event);

    if(eventIndex != -1){
        eventList.splice(eventIndex , 1);
    }
    return res.redirect('/eventlist');
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

