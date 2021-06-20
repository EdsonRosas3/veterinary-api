const  bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const UserSchema = new Schema({
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
    role:{
        type:String,
        default:"veterinary"
    },
    /* publications:[{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Veterinary'
    }] */
},{
    timestamps: true 
});

UserSchema.statics.encryptPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
UserSchema.statics.comparePassword= async(password,receivedPassword)=>{
    return bcrypt.compare(password,receivedPassword);
}
module.exports = model('User',UserSchema);