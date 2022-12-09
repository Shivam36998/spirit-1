import mongoose from "mongoose";


const admin_schema=new mongoose.Schema({
    email:{type:String, require:true},
    password:{type:String},
})

const admin_model= mongoose.model('admin', admin_schema);
export default admin_model;