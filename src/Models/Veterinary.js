const  bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const VeterinarySchema = new Schema({
    name:String,
    last_name:String,
    vet:String,
    email:{
        type: String,
        required: true,
        unique:true,
    },
    phone:String,
    direction:String,
    urlImg:String,
    password:{
        type: String,
        required:true
    },
});

VeterinarySchema.statics.encryptPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
VeterinarySchema.statics.comparePassword= async(password,receivedPassword)=>{
    return bcrypt.compare(password,receivedPassword);
}
//VeterinarySchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Veterinary',VeterinarySchema);