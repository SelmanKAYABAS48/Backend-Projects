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

dbConnection()

//body parser
app.use(express.json()) //bu çağırma işlemini yapmadan post isteği atıldığında body parse edilemeyeceği için json js dosyasına dönüşemeyeceği içn hata verecektir


// httpOnly: true XSS Cross Site Scripting
app.use(require("cookie-session")({
    secret:process.env.SECRET_KEY

    // cookie:{
    //     secure:!(process.env.NODE_ENV=="development"),
    //     httpOnly:false,
    //     maxAge:24*60*60*1000,}
    }


))

app.use(require('./src/middlewares/findSearchSortPage'))

//HomePath

app.all("/",(req,res)=>{
    res.send({
        error:false,
        message:"Wellcome to PERSONNEL API",
        session:req.session,
        isLogin:req.isLogin
    })
})

app.use("/departments",require("./src/routes/department.router"))

app.all("*",async(req,res)=>{

    //throw CustomeError("Route not available")

    res.status(404).send({
        error:true,
        message: "Route not available"
    })
})

/* ------------------------------------------------------- */

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
