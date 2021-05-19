const User = require('../Models/User');

const signUp = async (req,res)=>{
    const {name,last_name,vet,email,phone,direction,urlImg,password}=req.body;
    const user = new User({
        name,
        last_name,
        vet,
        email,
        phone,
        direction,
        urlImg,
        password: await User.encryptPassword(password),
    });
   
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const signIn = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({exists:false,message:"no existe el usuario"});
        const comparePasswordVeterinary =await User.comparePassword(password,user.password);
        if(!comparePasswordVeterinary) return res.status(401).json({password:false,message:"contraseña incorreacta vuelva a intentar"});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getVeterinaries = async(req, res)=>{
    try {
        const users =  await User.find({role:"veterinary"});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
module.exports = {
    signIn,
    signUp,
    getVeterinaries
}