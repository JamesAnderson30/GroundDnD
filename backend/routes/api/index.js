// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const spotRouter = require('../spot.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
//router.use(restoreUser);


router.get('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });

router.use('/session', sessionRouter);

router.use(restoreUser);

router.use('/users', usersRouter);

router.use('/spots', spotRouter)

module.exports = router;
