const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// add all the methods for the / endpoint
dishRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end('Will send all the dishes to you!');
}).post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
}).put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
}).delete((req, res, next) => {
    res.end('Deleting all dishes');
});

// add all the methods for the /:dishId endpoint
dishRouter.route('/:dishId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end(`Will send details of the dish: ${req.params.dishId} to you!`);
}).put((req, res, next) => {
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.end(`Will update the dish: ${req.body.name} with details: ${req.body.description}`);
}).post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishes/${req.params.dishId}`);
}).delete((req, res, next) => {
    res.end(`Deleting the dish ${req.params.dishId}`);
});

// export the router so that we can use it in index.js
module.exports = dishRouter;