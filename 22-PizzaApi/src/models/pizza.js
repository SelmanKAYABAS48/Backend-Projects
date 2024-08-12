"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    // image: {
    //     type: String,
    //     trim: true,
    // },
    image: String,

    price: {
      type: Number,  //! Bu field'ta math. işlemi yapacağım için number verdim daha sonra değişim işlemi yapmamak için
      required: true,
    },

    toppingIds: [ //* burada array olmasa tek malzeme ekleyebilirim.Çok malzeme ekleyebilmem için burayı array yapmam gerekiyor..Burası array eklediğimiz için many to many ilişki oldu--bir pizzanın birden çok malzemesi olabilir ve bu malzemeler başka pizzalarda da yer alabilir bu nedenle burası unique olmayacak
      //? Eğer burada unique yapsaydım buradaki pizzaya girer ve başka bizzaya giremez bu nedenle one to one olurdu
      {
        type: mongoose.Schema.Types.ObjectId, //? bu field'ı toppings collection'ı ile bağlayacağım yer burası
        ref: "Topping", //! burası hangi tablo ile bağlayacağımı gösteren yer
      },
    ], //! buraya validasyon yapabilirim.user aynı içerikten yazmaması için
  },
  {
    collection: "pizzas",
    timestamps: true,
  },
);

// Model:
module.exports = mongoose.model("Pizza", PizzaSchema);
