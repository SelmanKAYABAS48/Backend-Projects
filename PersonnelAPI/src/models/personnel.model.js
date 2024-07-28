"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt");
// const uniqueValidator = require("mongoose-unique-validator");

const PersonnelSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId, // mongoDb'nin id formatı 24 haneli
      ref: "Department", // department tablosunu referans al.deparmentId'yi eşleştir
      required: true,
    }, // Personneleri department ile bağlayacak kısım burası.ForeingKey

    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      required: true,
      //minlength:10,
      //match:/^[0-9]+$/
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: [
        (email) => email.includes("@") && email.includes("."),
        // "Email is not valid", 
        //  email.includes("@") && email.includes("."): Bu, e-posta adresinin içinde @ ve . karakterlerinin bulunup bulunmadığını kontrol eden bir mantık ifadesidir. Bu iki karakterin her ikisi de e-posta adresinde mevcutsa, fonksiyon true döner; aksi halde false döner.
      ],
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    salary: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isLead: {
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "personnels", timestamps: true },
);

// PersonnelSchema.set("toJSON", {
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     delete ret.password;
//     ret.createdAt = ret?.createdAt.toLocaleDateString("tr-tr");
//   },
// });

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// }

// PersonnelSchema.virtual("fullname").get(function () {
//   return `${this.firstname} ${this.lastname}`;
//   // return `${capitalize(this.firstname)} ${capitalize(this.lastname)}`;
// });

// Bu kısım, Mongoose şemasına sanal (virtual) bir alan ekler. Sanal alanlar veritabanında fiziksel olarak saklanmaz, ancak şema örneği üzerinden erişilebilir.

// PersonnelSchema.virtual("fullname"): fullname adında bir sanal alan tanımlar.
// .get(function () {...}): fullname sanal alanına erişildiğinde çalışacak olan bir getter fonksiyonu tanımlar.

module.exports = mongoose.model("Personnel", PersonnelSchema);
