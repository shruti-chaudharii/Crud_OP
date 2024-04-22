const mongoose = require("mongoose");
const validator = require("validator");

const studentschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},
{
    email:{
        type: String,
        required:true,
        unique:[true, "Email is already present"],
        validate(value){
            if(validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        max:10,
        required:true,
        unique:true
    },
    address: {
        type:String,
        required:true
    }
})



const Student = new mongoose.model('Student',studentschema);

module.exports = Student;