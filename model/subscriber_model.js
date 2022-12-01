import mongoose from "mongoose";

const subscriber_schema= new mongoose.Schema({
    email:{type:String, require:true},
    join:{type:Date,default:Date.now}
})


const subscriber_model=mongoose.model('subscriber', subscriber_schema);
export default subscriber_model;