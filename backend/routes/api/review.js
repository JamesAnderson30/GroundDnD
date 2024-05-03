const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//const { restoreUser } = require("../../utils/auth.js");
const {restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review } = require('../../db/models');
const Models = require("../../db/models");
const review = require('../../db/models/review');
const Image = require('../../db/models/Image');
const router = express.Router();
//console.log(Models);

router.post("/:reviewId/images", requireAuth, restoreUser, (req, res)=>{
    let reviewId = req.params.reviewId;

    let review = Review.findByPk(reviewId);

    res.json(review);
})

module.exports = router;
