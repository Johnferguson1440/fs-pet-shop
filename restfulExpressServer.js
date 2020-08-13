//set up dependencies
var express = require('express');
//assign var to express function
var app = express();
//require fs
var fs = require('fs');
//call back function

 //handle request with routes
 //add all routes indiv then refactor after.
 //add in error status and content type and send data or response to webpage
app.get('/pets', function(req, res){
    
    fs.readFile("pets.json", "utf-8", function(error, data){ 
        //var parsedData = JSON.parse(data);        
        if(error){
            console.log(error);    
        }else{                       
            res.statusCode = 200;            
            res.setHeader("Content-Type", 'application/json');
            res.send(data);
    }
})})
app.get('/pets/0', function(req, res){
    fs.readFile("pets.json", "utf-8", function(error, data){ 
        var parsedData = JSON.parse(data);        
        if(error){
            console.log(error);    
        }else{                       
            res.statusCode = 200;            
            res.setHeader("Content-Type", 'application/json');
            res.send(parsedData[0]);
    }
})})

app.get('/pets/1', function(req, res){
    fs.readFile("pets.json", "utf-8", function(error, data){ 
        var parsedData = JSON.parse(data);        
        if(error){
            console.log(error);    
        }else{                       
            res.statusCode = 200;            
            res.setHeader("Content-Type", 'application/json');
            res.send(parsedData[1]);
    }
})})
app.get('/pets/2', function(req, res){
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.send("Not Found");
})
app.get('/pets/-1', function(req, res){
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.send("Not Found");
})

 //listen on a port
app.listen(3000, function(){
    console.log('server is running');
})
module.exports= app; 
