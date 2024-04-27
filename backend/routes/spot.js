const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie, restoreUser } = require('../utils/auth');
const { Spot } = require('../db/models');
const Models = require("../db/models");
const review = require('../db/models/review');

const router = express.Router();
//console.log(Models);
router.get("/current", async (req,res)=>{
    //console.log(Models);
    let spots = await Spot.findAll({
        include:{
            model: review,
            attributes: stars
        }
    });

    //console.log(test);
    res.json(spots);
})

module.exports = router;
