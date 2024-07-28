"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function() {
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
// const dbConnection = async function() {   //! diğer yazım şekli
//     try {
//         await mongoose.connect(process.env.MONGODB)
//         console.log('* DB Connected *')
//     } catch (err) {
//         console.log('* DB Not Connected *', err)
//     }
// }

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 