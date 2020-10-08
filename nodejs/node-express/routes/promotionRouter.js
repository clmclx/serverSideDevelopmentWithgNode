const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();


promotionRouter.use(bodyParser.json());

// add all the methods for the / endpoint
promotionRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end('Will send all the promotions to you!');
}).post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
}).put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
}).delete((req, res, next) => {
    res.end('Deleting all promotions');
});

// add all the endpoints for the /:promotionId endpoint
promotionRouter.route('/:promotionId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you!`);
}).put((req, res, next) => {
    res.write(`Updating the promotion: ${req.params.promotionId} \n`);
    res.end(`Will update the promotion: ${req.body.name} with details: ${req.body.description}`);
}).post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
}).delete((req, res, next) => {
    res.end(`Deleting the dish ${req.params.promotionId}`);
});

// export the router so that we can use it in index.js
module.exports = promotionRouter;