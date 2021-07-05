 // 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');



mongoose.connect('mongodb://172.21.75.150:27017/admin', {
    dbName: 'nodejs',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
 
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
    console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
    console.log('Connected!');
});


var users = mongoose.Schema({
    name : 'string',
    age : 'number', 
    comment : 'string'
});

var Users = mongoose.model('users', users);

//var newStudent = new Users({name:'Hong Gil Dong',  age:22, comment:'서울시 강남구 논현동'});

/*newStudent.save(function(error, data){
    if(error){
        console.log(error); 
    }else{
        console.log('Saved!')
    }
});*/

Users.find(function(error, users1){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(users1);
    }
})
/*
Users.remove({_id:'60d01af2a447c346a8d5dda0'}, function(error,output){
    console.log('--- Delete ---');
    if(error){
        console.log(error);
    }

    console.log('--- deleted ---');
});
*/



const redis = require("redis");
const express = require('express');
const router = express.Router();


const redisHost = "172.21.75.150";
const client = redis.createClient({
    host : redisHost,
    port : 6379

});

client.on("error", (err) => {
  console.error(err);
});

client.on("ready", () => {
  console.log("Redis is ready");
}); 

client.get("name" , (err , result) => { 
    console.log(result) 
}); 

client.get("age" , (err , result) => { 
    console.log(result) 
}); 

/*client.hmset('user1', {
    id: 'kamil',
    age: 25
}, redis.print);*/

client.hget("user1", "id", (err, result) =>{
    console.log(result);
});

client.hgetall("user1", (err, result) =>{
    console.log(result);
});


/*router.get('/', function(req, res, next) { 
    client.get("name" , (err , result) => { 
        console.log(result) 
    }); 
    res.render('index', { title: 'Express' }); 
});*/
