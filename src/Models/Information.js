const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const InformationSchema = new Schema({
    title:String,
    category:String,
    description:String,
    urlFoto:String,
    state:{
        type:Boolean,
        default:false
    },
    veterinary: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Veterinary'
    },
});

module.exports = model('Information',InformationSchema);