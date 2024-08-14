"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

/* ------------------------------------------------------- *
{
    "name": "Category -1"
}
/* ------------------------------------------------------- */

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        }
    },
    { collection: "categories", timestamps: true },
)
module.exports = mongoose.model("Category", categorySchema);