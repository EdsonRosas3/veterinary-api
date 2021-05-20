const Information = require("../Models/Information");
const User = require("../Models/User");
const  bcrypt = require('bcryptjs');

const passportEncrypt = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
const createUser = async ()=>{
    try {
        const count =await User.estimatedDocumentCount();
        console.log(count);
        if(count>0) return;
        const tompass = await passportEncrypt("tom")
        const jerrypass= await passportEncrypt("jerry")
        const adminpass = await passportEncrypt("admin")
        const values = await Promise.all([
            new User({name:"Tom",last_name:"Vaga Gozo",vet:"SALUD CANINA",email:"tom@gmail.com",phone:"72568012",direction:"Av Urtado y colon",urlImg:"/adsfsfsdf",password:tompass}).save(),
            new User({name:"Jerry",last_name:"Illanes Conde",vet:"PERRITO AMIGO",email:"jerry@gmail.com",phone:"62305458",direction:"Sacaba huayllani",urlImg:"/asdfsfsdf",password:jerrypass}).save(),
            new User({name:"admin",last_name:"Lozada Motes",email:"admin@gmail.com",phone:"74526312",direction:"molinos de someti",urlImg:"/adfsfsdf",password:adminpass,role:"admin"}).save(),
        ])
    } catch (error) {
        console.log(error.message);
    }
}
const createInformation = async ()=>{
    try {
        const count =await Information.estimatedDocumentCount();
        console.log(count);
        if(count>0) return;
        const  user= await User.findOne({name:"Tom"})
        const  user2= await User.findOne({name:"Jerry"})
        const values = await Promise.all([
            new Information({title:"La sdfaf asdfsfesfe",category:"Cuidado alimenticio",description:"asdfsaf adsadsfasffafdsffasdf sdfsdfsdfadsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"La sdfaf fsfesfe",category:"Enfermedades",description:"asdfsaf dasfdsfadf adsfasdf adsfasf sdfsdfsdfsdfsdfsdfsdfdsfsdfdsfsdfsd sdfsdfsdfdf",urlFoto:"/asdfafasff",veterinary:user._id}).save(),
            new Information({title:"una sdfaf asdfsfesfe",category:"Vacunas",description:"asdfsaf adsfasdf adsfasf asdfdsfsdfsdfdssdfdsfdsfsdfsdfsdfdsffsdfdsfdf",urlFoto:"/asdfafasff",veterinary:user2._id}).save(),
            new Information({title:"La sdfaf sddf",category:"Cuidado alimenticio",description:"asdfsaf sdfdsfsdfdsf adsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"El sdfaf adfdsfd",category:"Vacunas",description:"sdsdfdsfa asdfsdf sdfdsfsdfdsf adsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
            new Information({title:"El pppp adfdsfd",category:"Enfermedades",description:"sdsdfdsfa asdfsdf sdfdsfsdfdsf adsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
            new Information({title:"Perr sdfaf adfdsfd",category:"Cuidado alimenticio",description:"sdsdfdsfa asdfsdf sdfdsfsdfdsf asdfdsfdsfadsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
            new Information({title:"Perr sasdddddd adfdsfd",category:"Vacunas",description:"dsdsdsdsdfdsfa asdfsdf sdfdsfsdfdsf asdfdsfdsfadsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"Sasdddddd addddfdsfd",category:"Enfermedades",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfsdfdsf asdfdsfdsfadsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"TTTTTttttsdffdgfdg addddfdsfd",category:"Vacunas",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"llllllasdfdfsd addddfdsfd",category:"Cuidado alimenticio",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
            new Information({title:"pppppasdfdsfadsf addddfdsfd",category:"Vacunas",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
            new Information({title:"ooooooasdfadf addddfdsfd",category:"Enfermedades",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"JJJdfsdgfsdg addddfdsfd",category:"Enfermedades",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user._id}).save(),
            new Information({title:"PLADSds addddfdsfd",category:"Cuidado alimenticio",description:"dsdsdsdsdfdsfa dgdfsgfsd sdfdsfdfsdfsdfdsf asdfdsfdsfadsadsfasffafdsffadsddsdsdsfsdf adsfasf df",urlFoto:"/asdfafasff",state:"Aceptado",veterinary:user2._id}).save(),
        ])
    } catch (error) {
        console.log(error.message);
    }
}
module.exports ={
    createUser,
    createInformation
}
