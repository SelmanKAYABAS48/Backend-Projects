"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department=require("../models/department.model")

module.exports={
    list: async(req,res)=>{

        const data = await res.getModelList(Department) //! middlewares'teki find func.çalıştırdım pagination sort filter yapabileceğim yer
        //eğer burada find ile yapmaya çalışsaydım pagination yapamazdım.modelin ismi yada pagination için tüm listler ayrı ayrı uğraşmam lazım--- 

        res.status(200).send({
            error:false,
            data,
            detail:await res.getModelListDetails(Department)

        })
    },
    create: async(req,res)=>{

        const data = await Department.create(req,res)
        res.status(201).send({
            error:false,
            data
            
        })
    },
    read: async(req,res)=>{
        const data = await Department.findOne({_id:req.params.id}) //! burada tek department'i görünteleyecğim list'te department'in hepsini..BU neden findOne() yaptım. req ile gelen id'yi database'de kayıtlı olana eşit olanı arıyor

        res.status(200).send({
            error:false,
            data
            
        })
    },

    // update parametres: filter,update,options
    update: async(req,res)=>{

        const data = await Department.updateOne({_id:req.params.id},req.body,{runValidators:true})// req.body gelen veri database'de yoksa hata vermeden devam eder //!runValidators: true ayarı, Mongoose'da güncelleme işlemleri sırasında validasyonların çalıştırılmasını sağlar. Bu, veritabanındaki verilerin bütünlüğünü korumak ve geçersiz verilerin kaydedilmesini önlemek için önemlidir. Database katmanında değil'de uygulama katmanında validate yapacak

// bu kısımda modified kullanabiliriz.şart cümleciği ile

        res.status(202).send({
            error:false,
            data,
            new:await Department.findOne({_id:req.params.id})
            
        })
    },
    delete: async(req,res)=>{
        const data = await Department.deleteOne({_id:req.params.id})

        res.status(data.deletedCount ? 204 : 404).send({
            error:!data.deletedCount, //0 ise true,1 ise false...yukarıdaki data.deletedCount'a göre şekilleniyor
            data
            
            
        })
    }
}