/**
 * description: route for all doctors 
 * 
 */

const express=require('express')

const sharp=require('sharp')
const multer=require('multer')
const Doctor=require('../models/doctor')
const debug=require('../debug')
const auth=require('../middleware/authDoc')

const router=express.Router()


const upload=multer({
    limits:{
        fileSize:1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jeg|png)$/)){
          return  cb(new Error("we only need image for your profile"))
        }
            cb(undefined,true)
    }
    
})



 router.post('/doctors',async(req,res)=>{
    const doctor=new Doctor(req.body);   
     try{
         await doctor.save()
         const token=await doctor.generateAuthToken()
         res.status(201).send({doctor,token})
     }catch(e){
         debug(e)
         res.status(400).send(e)
     } 
 })

 router.post('/doctors/login',async (req,res)=>{
    try {
        const doctor=await Doctor.findByCredentials(req.body.email,req.body.password)
        const token=await doctor.generateAuthToken()
        res.send({doctor,token})
    } catch (e) {
        //console.log(e)
        res.status(400).send()
    }
})

router.post('/doctors/logout',auth,async (req,res)=>{
    try {
          req.doctor.tokens=req.doctor.tokens.filter((token)=>{
              return token.token!=req.token
          })

          await req.doctor.save()

          res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


router.get('/doctors/me',auth,async (req,res)=>{
    res.send(req.doctor)
})


router.patch('/doctors/me',auth,async (req,res)=>{
     
    const updates=Object.keys(req.body)
    const allowedUpdates=["password"]
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    
    try {
       
        const doctor=req.doctor
        
        updates.forEach((update)=>doctor[update]=req.body[update])

        await doctor.save()
        
        if(!doctor){
            return res.status(404).send()
        }

        res.send(doctor)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
router.delete('/doctors/me',auth,async (req,res)=>{
    try {
         await req.doctor.remove()
         sendCancelEmail(req.doctor.email,req.doctor.name)
         res.send(req.doctor)
     } catch (e) {
         console.log(e)
        res.status(500).send(e)   
     }
})

router.post('/doctors/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
   
   const buffer=await sharp(req.file.buffer).resize({
       width:250,
       height:250
   }).png().toBuffer()
   
   req.doctor.avatar=buffer
   await req.doctor.save()
   res.send()
},(error,req,res,next)=>{
   res.status(400).send({error:error.message})
})

router.delete('/doctors/me/avatar',auth,async (req,res)=>{
   try {
       req.doctor.avatar=undefined
       await req.doctor.save()
       res.send()

   } catch (e) {
       res.status(400).send()
   }
})

router.get('/doctors/:id/avatar',async (req,res)=>{
       try {
           const doctor=await Doctor.findById(req.params.id)

           if(!doctor || !doctor.avatar){
               throw new Error()
           }

           res.set("Content-Type",'image/png')
           res.send(doctor.avatar)

       } catch (e) {
           res.status(404).send()
       }
})


router.get('/doctors',async (req,res)=>{

    const match={}
    const sort={}

    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }


    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }

    try {
        const doctors=await Doctor.find({})
         
        //const doctors=req.doctors
        res.send(doctors)
    } catch (e) {
        res.status(500).send()
    }

})


router.get('/doctors/:id',async (req,res)=>{
    const _id=req.params.id

    try {
       const doctor=await Doctor.findById(_id)
       console.log(doctor)

       if(!doctor){
           return res.status(404).send()
       }

       res.send(doctor)

    } catch (e) {
        res.status(500).send(e)
    }

})

 module.exports=router