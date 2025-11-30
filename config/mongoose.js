const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rishishwarpreeti2810_db_user:6dnKvkm1bvYwl2CU@preeti2028.dducnyj.mongodb.net/eventmanagement?appName=Preeti2028');
const db = mongoose.connection;
db.on('error',console.error.bind(console ,'error connecting to comsole'));
db.once('open',function (){
    console.log('successfully connect to the db');
});