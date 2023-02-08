import mongoose from "mongoose";

const caSchema= new mongoose.Schema({
    name:{type:String, require:true, trim:true},
    lname:{type:String, require:true, trim:true},
    email:{type:String,require:true, trim:true, unique:true},
    phone:{type:Number, min:1000000000, max:9999999999},
    gender:{type:String},
    college:{type:String, require:true},
    year:{type:String},
    whatsapp:{type:Number,require:true,min:1000000000, max:9999999999},
    address:{type:String},
    code:{type:Number},
    question:{type:String, require:true}
})


const ca_model=mongoose.model('CA_Detail', caSchema);
export default ca_model;