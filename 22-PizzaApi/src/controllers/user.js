"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const User = require('../models/user')

module.exports = { //* Burada CRUD işlmelerini yapacağım

  list: async (req, res) => {

    /*
       #swagger.tags = ["Personnels"]
       #swagger.summary = "List Personnels"
       #swagger.description = `
           You can send query with endpoint for search[], sort[], page and limit.
           <ul> Examples:
               <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
               <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
               <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
               <li>URL/?<b>page=2&limit=1</b></li>
           </ul>
       `
   */

    const data = await res.getModelList(User)
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User) //! burası pagination için yapılan middleware getModelListDetails() veri detaylarını görek için çoklu veri

    })
  },
  read: async (req, res) => {

    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
*/

    const data = await User.findOne({ _id: req.params.id })
    res.status(200).send({
      error: false,
      data

    })
  },
  create: async (req, res) => {
    /*
         #swagger.tags = ["Users"]
         #swagger.summary = "Create User"
 */

    // if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(req?.body?.password)){} //! BU hali validation'ı geçerse demek

    //* Aşağıda validasyonda sonuç false dönecek ve ! bununla false'un değerini true'layıp bir işlem yapacağız 

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(req?.body?.password)) { 
      // şimdi burada kullanıcıdan gele password'ü regex testine soktuk validation'ı set işlemini aarlamadna önce yapmak istiyoruz..yani bunu controller'da yapıyoruz ki hatayı yakalayabilelim

      res.errorStatusCode = 404;
      // res?.errorStatusCode=404 // burada hata aldım neden?

      throw new Error('Password must be at least 8 characters long and contain at least one special character and at least one uppercase character')

      /*----------------------------------------*/
      // Alternative----- bu kısım yukarıdaki res.errorStatusCode'dan throw new Error kısmı dahil olan bölüme alternatif

      const customError = new Error("")
      error.statusCode = 404  // statusCode'u error'un içine property olarak verdik
      throw customError //! burada bizim throw ettiğimiz hata  Error handler'da err parametresine tekabü ediyor. ve orada   
      //* return res.status(err?.statusCode || res?.errorStatusCode || 500).send({ err.StatusCode benim burdan gönderdiğim error
      /*----------------------------------------*/



    }



    const data = await User.create(req.body)// body'den aldığımız verileri kullanacak
    res.status(201).send({
      error: false,
      data

    })
  },
  update: async (req, res) => {


    /*
           #swagger.tags = ["Users"]
           #swagger.summary = "Update User"
     */
    const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true }) // 3 parametresi olur 1.filter,2.update edilecek değerler,3.validator. default olarak update validation yapmaz..bunu yazarak update'e validation özelliği veriyoruz
    res.status(202).send({
      error: false,
      new: await User.findOne({ _id: req.params.id })  // updateOne'da gelen data'da yapılan sorguda bize sorgu hakkında bilgi verir başarılı olup olmadığı hakkında

    })
  },
  delete: async (req, res) => {

    /*
         #swagger.tags = ["Users"]
         #swagger.summary = "Delete User"
   */

    const data = await User.deleteOne({ _: req.params.id })
    res.status(data.deletedCount ? 204 : 404).send({
      //eğer deleteCount 1 geldiyse 204 0 geldiyse 404 gelecek
      error: !data.deleteCount,
      data, // sorgu sonucu hakkında bilgi döner


    })
  },
}