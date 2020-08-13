//require http
var http =require('http');
//require fs
var fs = require('fs');
//port
var port = process.env.PORT || 8000;
//create server
//make request handler
var server = http.createServer(requestHandler);

function requestHandler(req, res){
    //create routes for request url
if(req.method === 'GET'&& req.url ==="/pets"){
    petFile(req.url);    
}
//pet/0 route method-get url /pets/0 status 200 content app/json respond data with only 0 of array.
else if(req.method === 'GET'&& req.url ==="/pets/0"){
    petFile(req.url)
    
}//pet/1 route method-get url /pets/0 status 200 content app/json respond data with only 1 of array.
else if(req.method === "GET"&& req.url === "/pets/1"){
    petFile(req.url)   
}
//pets/2 route method get url pets/2 status 404 content text/plain not found body
else if(req.method === "GET"&& req.url === "/pets/2"){
    petFile(req.url);   
}///pets/-1 get 404 text/plain/not found
else if(req.method === "GET"&& req.url === "/pets/-1"){
    petFile(req.url);    
}
//make readfile function
function petFile(x){
    var petNum =x.charAt(6);    
    //extract the last segment of the url
    //put last segment into parsed data
    fs.readFile("pets.json", "utf-8", function(error, data){        
        var parsedData = JSON.parse(data);        
        if(error){
            console.log(error);    
        }else if(x === "/pets"){  
            console.log("1");          
            res.statusCode = 200;            
            res.setHeader("Content-Type", 'application/json');            
            res.end(data);            
        }else if((petNum === "-")||(petNum > parsedData.length-1)){
            console.log("2");
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("Not Found"); 
        }else{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(parsedData[petNum]));
            console.log(`you did it ${petNum}`)
            }
        })
    }}
    
    
//server listening to start server
server.listen(port, function() {
    console.log('Listening on port', port);
  });
  