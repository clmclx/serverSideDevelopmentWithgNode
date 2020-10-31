const express = require('express');
const bodyParser = require('body-parser');
const promotionRouter = express.Router();
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');


promotionRouter.use(bodyParser.json());

// add all the methods for the / endpoint
promotionRouter.route('/').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}).get((req,res,next) => {
   Promotions.find({}).then(promotions => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(promotions)
   }, err => next(err)).catch(err => next(err));
}).post((req, res, next) => {
    Promotions.create(req.body).then((promotion) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(promotion)
    }, err => next(err)).catch(err => next(err))
}).put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
}).delete((req, res, next) => {
    Promotions.remove({}).then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(resp)
    }, err => next(err)).catch(err => next(err))
});

// add all the endpoints for the /:promotionId endpoint
promotionRouter.route('/:promotionId')
.get((req,res,next) => {
    Promotions.findById(req.params.promotionId).then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.json(promotion);
    }, err => next(err)).catch(err => next(err))
})
    .put((req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId, {$set: req.body}, {new: true})
            .then(promotion => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, err => next(err)).catch(err => next(err))
})
    .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
}).delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
        .then(resp => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp)
        }, err => next(err)).catch(err => next(err))
});
// export the router so that we can use it in index.js
module.exports = promotionRouter;