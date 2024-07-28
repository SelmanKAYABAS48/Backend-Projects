"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require('express')
const { dbConnection } = require('./src/configs/dbConnection')
const app = express()

/* ------------------------------------------------------- */

require("dotenv").config()
const PORT = process.env.PORT || 8000

require("express-async-errors")

/* ------------------------------------------------------- */
dbConnection()
/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

//! dcConnection'da  mongoose'u import ettim oradan da export edip ilgili yerlerde kullanacağım 

//* nodemon development zamanında kullandığımız için npm i -D nodemon olarak yükledim
