const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const jwt=require('jsonwebtoken')

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
            if(value.toLowerCase().includes("password"))
                throw new Error('password should not contain the word password')
        }
    },
    tel:{
        type:String,
        trim:true
    },
    city:{
        type:String,
        trim:true
    },
    quater:{
        type:String,
        trim:true
    },
    speciality:{
        type:String,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    },
},
    {
    timestamps:true
    }
)

doctorSchema.statics.findByCredentials=async (email,password)=>{
    const doctor=await Doctor.findOne({email})

    if(!doctor){
        throw new Error('unable to login')
    }

    const isMatch =await bcrypt.compare(password,doctor.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return doctor
}


//instance methods
doctorSchema.methods.generateAuthToken= async function(){
    const doctor=this

    const token = jwt.sign({ _id : doctor._id.toString() },process.env.JWT_SECRET,{expiresIn:'24 hours'})

    doctor.tokens=doctor.tokens.concat({token})
    await doctor.save()

    return token
}

//modification of the json methods 
doctorSchema.methods.toJSON=function(){

    const doctor=this
    const doctorObject=doctor.toObject()

    delete doctorObject.password
    delete doctorObject.tokens

    return doctorObject

   
}

//hash the plain text pwd before saving
doctorSchema.pre('save',async function(next){
    const doctor=this

    //console.log('just before saving!')

    if(doctor.isModified('password')){
        doctor.password=await bcrypt.hash(doctor.password,8)
    }

    next()
})



const Doctor=mongoose.model('Doctor',doctorSchema)

module.exports=Doctor