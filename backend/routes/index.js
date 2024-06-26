
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const spotRouter = require('./api/spot');
// router.get('/test', (req, res)=>{
//     res.send("Test did");
// })

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });


  ////console.log(apiRouter);

router.use('/api', apiRouter);

//router.use('/spots', spotRouter)


module.exports = router;
