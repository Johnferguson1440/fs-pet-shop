//set up dependencies
var express = require('express');
//assign var to express function
var app = express();
//require fs
var fs = require('fs');
var json= require("./pets.json");
//require middleware
var bodyParser= require("body-parser");
var morgan= require("morgan");
//use the middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan("short"));

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
app.get('/pets/:id', function(req, res){
    //extract the last segment of the url
    //put last segment into parsed data
    var id= Number.parseInt(req.params.id);        
    fs.readFile("pets.json", "utf-8", function(error, data){        
        var parsedData = JSON.parse(data);        
        if(error){
            console.log(error);        
        }
        if(id<0 ||id> parsedData.length -1 || Number.isNaN(id)){
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.send("Not Found"); 
        }else{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.send(parsedData[id]);
        }
})})
//Post request
app.post('/pets', function(req, res){
    //console.log(req.body);
    
    if(isNaN(req.body.age)===false){
    var headerPet = {age:req.body.age, kind:req.body.kind, name:req.body.name};
    var newPet= headerPet;    
    //add new pet to pets.json
    json.push(newPet);
    //write file if condition is met
    fs.writeFile("pets.json",JSON.stringify(json), function(err){
        if(err){
            console.log(err);
        }else{
        res.send(newPet);
        }
    })
    }else{
        res.status(400).set("Content-Type", "text/plain").send("Bad Request"); 
    }})
    //patch request
app.patch('/pets/:id', function(req, res){
        //var for id entered as the data[id] read parse data
        var age=Number.parseInt(req.body.age)
        
        if((isNaN(age)===false) || (req.body.age === undefined)){
        var id= Number.parseInt(req.params.id);        
        fs.readFile("pets.json", "utf-8", function(error, data){        
        var parsedData = JSON.parse(data);        
            if(error){
            console.log(error);        
            }else{
            var dataCalled = parsedData[id];
            //get new objest fields
            //for var key in req.body
                for(var key in req.body){
                var petPatch = req.body[key]; 
                //data[id].key =key                
                dataCalled[key]= petPatch;
                parsedData.age= age;                 
                } //write to new file with stringify
                fs.writeFile("pets.json",JSON.stringify(parsedData), function(err){
                    if(err){
                        console.log(err);
                    }else{
                    res.send(dataCalled);
                    }
                })
            }
        })
        }else{
            res.status(400).set("Content-Type", "text/plain").send("Bad Request");
    }})

app.delete('/pets/:id', function(req, res){
    var id= Number.parseInt(req.params.id);        
        fs.readFile("pets.json", "utf-8", function(error, data){        
        var parsedData = JSON.parse(data); 
        var objDel= parsedData[id];       
            if(error){
            console.log(error);        
            }else{
                parsedData.splice(id,1);
                fs.writeFile("pets.json",JSON.stringify(parsedData), function(err){
                    if(err){
                        console.log(err);
                    }else{
                    res.send(objDel);
                    }
                })
    }})
})

 //listen on a port
app.listen(3000, function(){
    console.log('server is running');
})
module.exports= app;