"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

// aşağıdaki enum değerlerini başka dosyada tanımlayıp size field'ında enum:Object.values(PizzaSizeEnum) bu şekidle çağırırım
const PizzaSizeEnum = {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
  XLARGE: "XLarge",
};
//!Object.keys(PizzaSizeEnum)
//!Object.entries(PizzaSizeEnum)
const OrderSchema = new mongoose.Schema(
  {
    userId: { //! burada sadece 1 kullanıcı siparişi olacak
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pizzaId: { // 1 siparişte 1 pizza olacak çeşit olarak
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
    },
    size: {
      //Small, Medium,Large, Xlarge
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"], //! mongoose'da enum veri tipi var
      //enum:Object.values(PizzaSizeEnum)
    },

    quantity: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.quantity * this.price;
      }, // Create
      transform: function () {
        return this.quantity * this.price;
      }, //Update
    },
  },
  { collection: "orders", timestamps: true }, //* burada arrow func kullanmadım da normal func yazdım çünkü
);

//! totalPrice alanı, siparişin toplam fiyatını otomatik olarak hesaplar ve hem oluşturma hem de güncelleme işlemleri sırasında bu değerin doğru olmasını sağlar. default işlevi, siparişin ilk oluşturulmasında, transform işlevi ise siparişin güncellenmesinde kullanılır.

// Model:

module.exports = mongoose.model("Order", OrderSchema);
