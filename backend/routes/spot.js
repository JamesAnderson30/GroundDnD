const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User } = require('../db/models');
const spot = require('../db/models/spot');

const router = express.Router();

router.get("/current", async (req,res)=>{
    let test = await spot.findAll();
    res.json(spot);
})

module.exports = router;
