const express = require('express');
const mongoose = require('mongoose');

const Promos = require('../models/promotion');

const promoRouter = express.Router();

promoRouter.use(express.json());

/* For '/promotions' */

promoRouter.route('/')
.get((req, res, next) => {
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    Promos.create(req.body)
    .then((promos) => {
        console.log('Promos Created', promos);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err)=> next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promo');
})

.delete((req, res, next) => {
    Promos.remove({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));
});

/* For /promotions/:promoId  */

promoRouter.route('/:promoId')
.get((req, res, next) => {
    Promos.findById(req.params.promoId)
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    },(err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions' + req.params.promoId);
})

.put((req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new:true })
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.delete((req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;