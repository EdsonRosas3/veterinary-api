const jwt = require('jsonwebtoken');
const Veterinary = require('../Models/Veterinary');
const verifyToken =async (req,res,next)=>{
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({token:null,message:"No existe un token"});
        const decoded = jwt.verify(token,process.env.SECRET);
        req.userId = decoded.id;
        const user = await Veterinary.findById(req.userId,{password: 0});
        if(!user) return res.status(404).json({user:null,message:"El usuario no existe"});
        next();
    } catch (error) {
        return res.status(401).json({message:"No tiene autorizacion"})
    }
}

const isModerator = async(req,res,next) =>{
    req.roles.forEach(role => {
        if(role.name === "moderator"){
            return next();
        }
    });
    return res.status(403).json({teacher,message:"No tienes los permisos de Moderador"});
 
}
const isAdmin = async(req,res,next) =>{
    req.roles.forEach(role => {
        if(role.name === "admin"){
            return next();
        }
    });
    return res.status(403).json({teacher,message:"No tienes los permisos de Administrador"});
}

module.exports = {
    verifyToken,
    isModerator,
    isAdmin,
}