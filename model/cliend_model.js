// model for client data
import mongoose from "mongoose";

const client_schema= new mongoose.Schema({
    name:{type:String, require:true, trim:true},
    email:{type:String, require:true},
    phone:{type:Number, min:1000000000, max:9999999999},
    password:{type:String},
    join:{type:Date,default:Date.now}
})


const client_model=mongoose.model('client_data', client_schema);
export default client_model;