const Information = require('../Models/Information');

const createInformation = async(req,res)=>{
    const{ title, category,description,urlFoto,veterinary} = req.body;
    const information = new Information({title,category,description,urlFoto,veterinary});
    try {
        const newInformation = await information.save();
        res.status(201).json({newInformation});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getPermittedInformations = async(req,res)=>{
    try {
        const informations = await Information.find({state:"Aceptado"});
        res.status(200).json(informations);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const getPendingInformations = async(req,res)=>{
    try {
        const informations = await Information.find({state:"Pendiente"});
        res.status(200).json(informations);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const getInformationById = async(req,res)=>{
    try {
        const id = req.params.id;
        const information =  await Information.findById(id);
        if(!information) return res.status(400).json({id:null,message:"no hay respuesta referente al ID"})
        res.status(200).json(information);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const deleteInfromationById = async(req,res)=>{
    try {
        const {id} = req.params;
        const information = await Information.findByIdAndDelete(id);
        if(!information) return res.status(400).json({id:null,message:"no hay respuesta referente al ID"})
        res.status(200).json({delete:true,message:"eliminado exitosamente!"});
    } catch (error) {
        res.status(400).json({delete:false,message:error.message})
    }
}
const updateInformationById = async(req,res)=>{
    const{ title, category,description,urlFoto} = req.body;
    try {
        const id = req.params.id;
        const information = await Information.findByIdAndUpdate(id,{title,category,description,urlFoto});
        if(!information) return res.status(400).json({id:null,message:"no hay respuesta referente al ID"})
        res.status(200).json(information);
    } catch (error) {
        res.status(400).json({delete:false,message:error.message})
    }
}
const updateInformationStateById = async(req,res)=>{
    const{state} = req.body;
    try {
        const id = req.params.id;
        const information = await Information.findByIdAndUpdate(id,{state});
        if(!information) return res.status(400).json({id:null,message:"no hay respuesta referente al ID"})
        res.status(200).json(information);
    } catch (error) {
        res.status(400).json({delete:false,message:error.message})
    }
}
const getSearchCategory = async(req,res)=>{
    const {category}= req.body;
    try {
        const informations = await Information.find(category);
        res.status(200).json(informations);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const getCuidadoAlimenticio = async(req,res)=>{
    try {
        const cuidadoAlimenticio = await Information.find({category:"Cuidado alimenticio",state:"Aceptado"});
        res.status(200).json(cuidadoAlimenticio);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
const getEfermedades = async(req,res)=>{
    try {
        const enfermedades = await Information.find({category:"Enfermedades",state:"Aceptado"});
        res.status(200).json(enfermedades);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const getVacunas = async(req,res)=>{
    try {
        const vacunas = await Information.find({category:"Vacunas",state:"Aceptado"});
        res.status(200).json(vacunas);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports = {
    createInformation,
    getPermittedInformations,
    getPendingInformations,
    getInformationById,
    deleteInfromationById,
    updateInformationById,
    updateInformationStateById,
    getSearchCategory,
    getCuidadoAlimenticio,
    getEfermedades,
    getVacunas
}