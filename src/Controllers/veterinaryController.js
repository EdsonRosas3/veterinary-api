const Veterinary = require('../Models/Veterinary');

const signUp = async (req,res)=>{
    const {name,last_name,vet,email,phone,direction,urlImg,password}=req.body;
    const veterinary = new Veterinary({
        name,
        last_name,
        vet,
        email,
        phone,
        direction,
        urlImg,
        password: await Veterinary.encryptPassword(password),
    });
   
    try {
        const newveterinary = await veterinary.save();
        res.status(201).json({newveterinary});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const signIn = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const veterinary = await Veterinary.findOne({email});
        if(!veterinary) return res.status(400).json({exists:false,message:"no existe el usuario"});
        /*Verificar password */
        const comparePasswordVeterinary = Veterinary.comparePassword(veterinary.password,password);
        if(!comparePasswordVeterinary) return res.status(401).json({password:false,message:"contraseña incorreacta vuelva a intentar"});
        res.status(200).json({veterinary});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    signIn,
    signUp,
}