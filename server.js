
const http = require('http');
const url = require('url');
const jsonSchema = require('./validation');

//urls that surver supports
const Urls = ["/create" , "/read" , "/update" , "/delete"];

const server = http.createServer((req, res) => {;
  //ckeck the url of the request
  if(!Urls.includes(req.url)){
    console.log('Invalid Url - not found');
    res.statusCode = 404; // not found
    res.end("Not found");
    return;
  }
  //check if request contain JSON
  if(req.headers['content-type'] !== 'application/json'){
    console.log("does not contain JSON");
    res.statusCode = 400; // bad request
    res.end("Request have to contain valid JSON"); 
    return;
  }
  let body = '';
  let valid = true;
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end' , () => {
    try {
      const data = JSON.parse(body);
      console.log('Received data:', data);
      //validate JSON schema 
      switch(req.url){
        case '/create':
          console.log('create');
          if(!jsonSchema.validateCreate(data)){
            valid = false;
          }

        break;
        case '/read':
          console.log('read');
          if(!jsonSchema.validateRead(data)){
            valid = false;
          }
        break;
        case '/update':
          console.log('update');
          if(!jsonSchema.validateEdit(data)){
            valid = false;
          }
        break;
        case '/delete':
          console.log('delete');
          if(!jsonSchema.validateDelete(data)){
            valid = false;
          }
        break;
      }
      if(valid){
        res.statusCode = 200; // ok
        res.end();
      }
      else{
        console.log('Invalid JSONSchema');
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSONSchema');
      }
    } catch (error) {
      console.log('Invalid JSON');
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON');
    }
  });
 
});
//set server port
server.listen(8080, () => {
  console.log('Server listening on port 8080');
});