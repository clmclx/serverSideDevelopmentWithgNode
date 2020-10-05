const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

// add all middleware witb app.use()
app.use(morgan('dev'));
app.use(bodyParser.json());


app.all('/dishes', (req,res,next) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   next(); // calls next to make sure we handle the specific request correctly
});

// on all dishes
app.get('/dishes', (req,res, next) => {
    res.end('Will send all the dishes to you');
});

app.post('/dishes', (req,res, next) => {
    res.end('Will update the dish ' + req.body.name + ' with details ' + req.body.description);
});

app.put('/dishes', (req,res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /dishes');
});

app.delete('/dishes', (req,res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation is not supported on /dishes');
});


// on specific dishes
app.get('/dishes/:dishId', (req,res, next) => {
    res.end('Will send the information about the dish ' +req.params.dishId + ' to you');
});

app.post('/dishes/:dishId', (req,res, next) => {
    res.end('POST not supported on /dishes/:dishId');
});

app.put('/dishes/:dishId', (req,res, next) => {
    res.statusCode = 403;
    res.write(`will update the dish ${req.params.dishId}`);
    res.end(`will update the dish :  ${req.body.name} + with details ${req.body.description}`);

});

app.delete('/dishes/:dishId', (req,res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation is not supported on /dishes/:dishId');
});

app.use(express.static(__dirname + '/public'));
// app.use((req,res,next) => {
//    console.log(req.headers);
//    res.statusCode = 200;
//    res.setHeader('Content-Type', 'text/html');
//    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
// });

const server = http.createServer(app);
server.listen(port,hostname, () => {
   console.log(`Server running at ${hostname}:${port}`);
});