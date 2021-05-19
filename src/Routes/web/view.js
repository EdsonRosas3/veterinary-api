const {Router} = require('express');
const puppeteer = require('puppeteer');
const User = require('../../Models/User');
const router =  Router();


router.get('/',async(req, res)=> {
    const veterinaries = await User.find();
    console.log(veterinaries);
    res.render('home',{veterinaries:veterinaries});
});
router.get('/descargar',async(req,res)=>{
    let pdf = await crearFactura("http://localhost:5000/pdf");

    res.contentType('application/pdf');
    res.send(pdf);
});

async function crearFactura(url) {
    //abrir el navegador 
    let navegador = await puppeteer.launch();
    //Creamos una nueva pestaña o pagina
    let pagina = await navegador.newPage();
    //Abrir la url dentro de esta pagina
    await pagina.goto(url);
    //cramos el pdf
    let pdf = await pagina.pdf();
    //Cerrado el navegador
    navegador.close();
    return pdf;
}

module.exports = router;
