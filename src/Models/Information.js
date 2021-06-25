const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const InformationSchema = new Schema({
    title:String,
    category:String,
    description:String,
    urlFoto:String,
    state:{
        type:String,
        default:"Pendiente"
    },
    veterinary: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
},{
    timestamps: true 
});
module.exports = model('Information',InformationSchema);