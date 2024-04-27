const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { spot } = require('../db/models');
const Models = require("../db/models")

const router = express.Router();
//console.log(Models);
router.get("/current", async (req,res)=>{
    console.log(Models);
    let test = await Models.spot.findAll();
    console.log(test);
    res.json(test);
})

module.exports = router;
