"use strict";

/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema({
  // mvc'nin model katmanındayız.Modelin özellği database ile iletişime geçmektir.Required validation yapar.Database'e gitmeden bu alan gerekli dediğimiz için kullanıcıdan gelen bilgide rerequired yoksa hata döner...Unique'de mongodb indexleme yapıyor database'e gidiyor..eğer database'de index'te üst üste binme varsa yani bu alan daha önce kaydedilmiş başka kaydedemezsin der..Unique database'e gidip kendisi sorgu yapıyor..bunu kontrollü bir şekilde yapmak için bizim yapmamız için ...Username alanı olduğu için sorgu atarız controller'da sorgu atarız database'e mongoose aracılığı ile o lana varsa hata döneriz yoksa devam ederiz


  username: {
    type: String,
    trim: true,
    required: true,
    unique: true


  },

  password: {
    type: String,
    trim: true,
    required: true,
    set: (password) => passwordEncrypt(password),
    // set:passwordEncrypt//! bu şekilde de kullanabilirim 

    //!BURADA İLK ÖNCE ŞİFREYİ CRYPTO YAPIYOR VE SONRA AŞAĞIDA VALIDATE'E GİRİYOR ANCAK VALIDATE'TE PASSWORD'U AŞAIĞDAKİ REGEX İLE CHECK EDİYOR VE VALIDASYONDAN GEÇEMİYOR..

    //* bu durumu düzeltmenin alternatiflerinden birisi validate'i devredışı bırakıp set içinde yapmak..araştır

    //? Diğer alternatif regex'i alıp controller'a gidip birde burayı yorm satrına alıp...controlelr'da create'te ..devamı orada...

    // validate: [
    //       (password) =>
    //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password),
    //       "Password type is not correct.",
    //     ], 
        // test(password), JavaScript'te düzenli ifadeler (regex) ile kullanılan bir metoddur. test metodu, belirli bir stringin (bu durumda password değişkeni) düzenli ifadeye (regex) uyup uymadığını kontrol eder. Eğer string regex'e uyuyorsa true, uymuyorsa false döner.


  



      //   set: async (password) => {
      //       if ( !password ) {
      //           throw new Error( 'Password is required' );

//! yukarıda password'ü şifrelemeden önce validate yapmaya çalışıyoruz set ile

      //       }
      //       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
      //       if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password) ) {
      //           throw new Error( 'Password must be at least 8 characters long and contain at least one special character and uppercase character' );
      //       }
      //       return passwordEncrypt(password)//* bu kısım ise hiç hata olmaması durumunda yani ifleri başarılı bir şekilde geçerde return'e geçecek ve sonra password şifrelenmiş olacak
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
   // validate:
     //[(email)=> (email.inclıdes('@')&& email.incudes('.')) , //* burası sadece @ ve . yazsam validation'dan geçer
    //   " Please fill a valid email address"] //! Array içinde kullanırız.ilk parametre regEx 2.parametre mesaj

      // [(email) => (email.includes('@') && email.includes('.'))]: Bu, bir doğrulama fonksiyonudur. Fonksiyon, email adında bir parametre alır ve bu parametrenin bir '@' sembolü ve bir '.' içerip içermediğini kontrol eder. Eğer hem '@' hem de '.' içeriyorsa, fonksiyon true döner, aksi halde false.

      validate:[
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        "Please fill a valid email address",
      ]



  },

  isActive: {
type: Boolean,
default:true
  },

  isAdmin: {
    type: Boolean,
    default:false

  }



},
  {
    collection: "users",
    timestamps: true


  })

  module.exports = mongoose.model("User",UserSchema)

