//conditional to explain read create update destroy
//require fs from node module
var fs = require("fs");
var json= require("./pets.json");

var secArg =process.argv[2]
var thirdArg = Number(process.argv[3]);
var fourthArg=process.argv[4];
var fifthArg= process.argv[5];

if(process.argv.length <=2){
    console.log("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}else if(secArg === "create"){
    addPet();
}else if(secArg === "read"){
    readPet();

}else if(secArg === "update"){

}else if(secArg === "destroy"){

}else{
    console.log(secArg);
    console.log("Failed to complete any work");
    process.exit(1);
}

function readPet(){
fs.readFile('pets.json', 'utf-8', function(error, data){
    //parse the data
    var arrayValue= JSON.parse(data);     
    //if err return error
    if(error){
        console.log(error);
    }
    else if(arrayValue[thirdArg]=== undefined){
        process.exit(1);
    }else{
        //we need the index value only to display.
        //log the data[i]
        console.log(arrayValue[thirdArg]);
    }
})}
//func to create new object
//if 3 vars are not age kind or name no record 3rd number 4th =string 5th =string
function createFile(){    
    if(isNaN(thirdArg)===false){
        fs.writeFile("pets.json",JSON.stringify(json), function(err){ 
            if (err) {
                console.log(err);
            }  else{
                console.log('Saved');
            }   
        })   
    }else{        
        console.log("Usage: node pets.js create AGE KIND NAME");
    }}    
    
    function addPet(){  
    var newPet={age:thirdArg, kind:fourthArg, name:fifthArg}    
    //if age kind name dont exist create file
    //if(checkPet(newPet)){
        //else console log pet exist
        json.push(newPet);
        createFile();
       //console.log("New Pet Added!");
    //}else{
        //console.log("Pet already exist!");
    //}

    }
    
    //function checkPet(x){
        //json.some(user=>user === x.age&&x.kind&&x.name)//&&json.some(user=>user.kind === x.kind)&&json.some(user=>user.name === x.name);
        
    //}






