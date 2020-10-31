const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();

const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

// add all the methods for the / endpoint
leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({}).then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
    },err => next(err)).catch(err=> next(err));
}).post((req, res, next) => {
    Leaders.create(req.body).then(leader =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
    }, err => next(err)).catch(err => next(err));
}).put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
}).delete((req, res, next) => {
    Leaders.remove({}).then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, err => next(err)).catch(err => next(err));
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