const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();


leaderRouter.use(bodyParser.json());

// add all the methods for the / endpoint
leaderRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end('Will send all the leaders to you!');
}).post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
}).put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
}).delete((req, res, next) => {
    res.end('Deleting all leaders');
});

// add all the endpoints for the /:leaderId endpoint
leaderRouter.route('/:leaderId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end(`Will send details of the leader: ${req.params.leaderId} to you!`);
}).put((req, res, next) => {
    res.write(`Updating the leader: ${req.params.leaderId} \n`);
    res.end(`Will update the leader: ${req.body.name} with details: ${req.body.description}`);
}).post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /leaders/${req.params.leaderId}`);
}).delete((req, res, next) => {
    res.end(`Deleting the dish ${req.params.leaderId}`);
});

// export the router so that we can use it in index.js
module.exports = leaderRouter;