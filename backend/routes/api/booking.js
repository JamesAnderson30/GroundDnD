const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, Image, ReviewImages, User, SpotImages, Booking } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');

const router = express.Router();




router.get("/current", restoreUser, requireAuth,async (req, res)=>{
    const id = req.user.dataValues.id;

    //console.log(id);

    let bookings = await Booking.findAll({
        where: {
            userId: id
        },
        attributes:{
            exclude:["SpotId"]
        }
    });

    for(let booking of bookings){
        let bkData = booking.dataValues;
        //console.log("!!! bkData: ", bkData);
        let spot = await Spot.findOne({
            where: {
                id: bkData.spotId
            },
            include:[
                {
                    model: Image,
                    through: SpotImages,
                    where:{
                        preview:true
                    }
                }
            ],
            attributes:{exclude: ["createdAt", "updatedAt", "description"]}
        });

        let previewUrl = "not-found.png";

        //console.log("!!! spot: ", spot.dataValues.Images);

        if(spot.dataValues.Images.length > 0){
            previewUrl = spot.dataValues.Images[0].dataValues.url;
        }



        //res.json(spot);

        let previewImageUrl = "not-found.png";
        //console.log(spot);
        let images = spot.dataValues.Images;

        //console.log(images);

        if(images.length > 0){
            previewImageUrl = images[0].dataValues.url
        }

        delete spot.dataValues.Images;

        spot.dataValues["previewImage"] = previewImageUrl;

        booking.dataValues["Spot"] = spot

        //res.json(booking);

    }

    //bookings["Spot"] = spot;

    res.json({Bookings:bookings});
})

router.delete("/:bookingId", restoreUser, requireAuth, async (req, res)=>{
    let booking = await Booking.findByPk(req.params.bookingId,{attributes:{exclude:["SpotId"]}});

    if(!booking){
        res.statusCode = 404;
        res.json({message:"Booking couldn't be found"});
        return;
    }

    let startDate = booking.dataValues.startDate;

   // console.log(startDate);

    console.log("startDate: ", startDate, " new Date(): ", new Date());

    if(startDate < new Date()){
        res.statusCode = 403;
        res.json({message:"Bookings that have been started can't be deleted"});
        return;
    }

    booking.destroy();

        res.json({message:"Successfully deleted"});

})

module.exports = router;















/*
let avgSpotReviewsAndPreview = function(bookings){

    for(let booking of bookings){
        let spot = booking.dataValues.Spot;
        console.log(spots);
        let spotsArray = [];

        for(let spot of spots){
            let count = 0;
            let total = 0;
            let avg = 0;
            let previewImageUrl = "not-found.png";
            //console.log(spot);
            let images = spot.dataValues.Images;

            //console.log(images);

            if(images.length > 0){
                previewImageUrl = images[0].dataValues.url
            }

            if(spot.dataValues.Reviews.length > 0){
                //console.log("avg");
                for(let review of spot.dataValues.Reviews){
                    //console.log("count");
                    count++;
                    total += review.dataValues.stars
                }
                avg = total / count;
            }

            delete spot.dataValues.Reviews
            delete spot.dataValues.Images

            spot.dataValues["previewImage"] = previewImageUrl;
            spot.dataValues["avgRating"] = avg;
            //console.log(spot.dataValues);
            spotsArray.push(spot);
        }
    }
    return spotsArray;
}*/
