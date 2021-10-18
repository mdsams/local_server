const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders info. to you')
})
.post((req, res, next) =>{
    res.end('Will add the leaders '+ req.body.name+ ' leaders info '+ req.body.info);
})
.put((req, res, next) => {
    res.statusCode = 404;
    res.end('PUT operation not supported on /leaders')
})
.delete((req, res, next) => {
    res.end('deleting all the leaders');
});


leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId + 'to you');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leader' + req.params.leaderId);
})

.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('will update the leader: ' + req.body.name + ' leaders info: '+ req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting leader!' + req.params.leader);
});

module.exports = leaderRouter;