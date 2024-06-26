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

router.delete("/:imageId", restoreUser, requireAuth, async(req, res)=>{
    let img = await Image.findByPk(req.params.imageId,{
        include:{
            model:Spot
        }
    });

    let imgToDestroy = await Image.findByPk(req.params.imageId);

    if(!img){
        res.statusCode = 404;
        res.json({message:"Spot Image couldn't be found"});
        return;
    }

    //let spot = await img.getSpot();
    /*{
  id: 5,
  url: 'image.url',
  preview: true,
  createdAt: 2024-05-06T16:55:59.980Z,
  updatedAt: 2024-05-06T16:55:59.980Z,
  Spots: [
    {
      id: 2,
      ownerId: 5,
      address: '321 Valid Edit Way',
      city: 'Edicity',
      state: 'New Editia',
      country: 'United States of Edited Data',
      lat: '-26.6534247',
      lng: '133.5641438',
      name: 'The Edited Spot',
      description: 'Place where valid edits can stay',
      price: '321',
      createdAt: 2024-05-06T16:55:59.812Z,
      updatedAt: 2024-05-06T16:56:01.730Z,
      SpotImages: [Object]
    }
  ]
}*/

    let imgData = img.get({plain:true});

    ////console.log("!!!ImgData: ",imgData);

    //if(!req.user.dataValues.id ||

    let userId = req.user.dataValues.id;

    if(!imgData.Spots || imgData.Spots[0].ownerId != userId){
        res.statusCode = 403;
        res.json({message:"Authorization required"});
        return;
    }

    //spotJoin.destroy();
    //res.json(img);
    imgToDestroy.destroy();


        res.json({message:"Successfully Deleted"});

})

module.exports = router
