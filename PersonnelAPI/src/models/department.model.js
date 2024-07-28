"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const DepartmentSchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        unique:true  //! Departman isimleri unique olur ve değişmez
        //mongoDb documention'da mongoDb unique not validate yazar..Validate olayı user'dan gelen veriye bakacak.validation'ı geçerse hata dönmeden devam edecek..uygulama katmanı ile dataBase arasında bağlantı kurmamızı sağlayan yapı model'dir.Model unique durumunda database'e burada validation yapmaz ..Unique validation'ı araştır
    }



},

{
collection:"departments", //! database'de bu isimde görünecek
timestamps:true 
})

module.exports = mongoose.model("Department",DepartmentSchema)