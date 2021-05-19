const User =  require('../Models/User');

const checkDuplicateEmail = async (req,res,next)=>{
    const veterinary = await User.findOne({email:req.body.email});
    if(veterinary) return res.status(400).json({message:`El email ${req.body.email} ya existe`});
    next();
}

module.exports = {
    checkDuplicateEmail,
}