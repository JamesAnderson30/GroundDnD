const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//console.log();

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.get("/test213", (req, res)=>{
    sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
      console.log('// Tables in database','==========================');
      console.log(tableObj);
  })
  .catch((err) => {
      console.log('showAllSchemas ERROR',err);
  })
  })
  const routes = require('./routes');

  app.use(routes); // Connect all the routes

  module.exports = app;
