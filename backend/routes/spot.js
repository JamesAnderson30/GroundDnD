const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const { setTokenCookie, restoreUser } = require('../utils/auth');
const { Spot, Review } = require('../db/models');
const Models = require("../db/models");
const review = require('../db/models/review');
const router = express.Router();
//console.log(Models);
router.get("/current", async (req,res)=>{


    let userId = req.user.id;
    //console.log(Models);
    // res.contentType("text/plain")
    // console.log(Models.Review);
    // res.send(Models.models)

    let spots = await Spot.findAll({
        include:{
            model: Models.Review,
            attributes: ["stars"]
        }
    });

    //debug
    let spotsArray = [];

    for(const spot of spots){
        let count = 0;
        let total = 0;
        let avg = 0;

        if(spot.Reviews.length > 0){
            for(const review of spot.Reviews){
                count++;
                total += review.stars;
            }
            avt = total / count;
        }

        spot["avgRating"] = avg;

        spotsArray.push(spot);
    }
    }

    res.json(spotsArray);

    //console.log(test);
    //res.json(spots);
})

module.exports = router;
