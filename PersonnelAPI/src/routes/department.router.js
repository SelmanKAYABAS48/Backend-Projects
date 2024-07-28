"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

// const { departmentController } = require('../controllers/department.controller')

const department = require('../controllers/department.controller')

/* ------------------------------------------------------- */

router.route("/")
 .get(department.list) //! tüm liste döndürülecek
 .post(department.create) //?yeni kulanıcı oluşturulacak anasayfa route'unda

 router.route("/:id")

 .get(department.read)
 .put(department.update) // önceki objenin yerine komple yenisini koyar
 .patch(department.update) // kısmi değişiklik yapar
 .delete(department.delete)


/* ------------------------------------------------------- */
module.exports = router