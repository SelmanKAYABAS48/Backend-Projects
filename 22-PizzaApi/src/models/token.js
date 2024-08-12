"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const TokenSchema = new mongoose.Schema({

userId:{
  type:mongoose.Schema.Types.ObjectId,// mongoose.Schema.Types.ObjectId: MongoDB belgelerindeki benzersiz kimlikler (_id) için kullanılan veri tipidir.
  // İlişkiler: Belgeler arasında referans oluşturmak için kullanılır.
  // Zaman Damgası: ObjectId oluşturulma zamanını içerir ve bu nedenle benzersizdir.
  ref:"User",
  required:true,
  unique:true,
  index:true
},
token:{
  type:String,
  trim:true,
  required:true,
  unique:true,
  index:true
}

},{
  collection:"tokens",
  timestamps:true
})

module.exports = mongoose.model("Token",TokenSchema)