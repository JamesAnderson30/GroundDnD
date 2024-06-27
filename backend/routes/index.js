
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const spotRouter = require('./api/spot');


router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}


  ////console.log(apiRouter);

router.use('/api', apiRouter);

//router.use('/spots', spotRouter)


module.exports = router;
