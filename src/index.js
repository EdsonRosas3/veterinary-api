const app = require('./app');
const {createInformation,createUser} = require("./libs/initialSetup");

require('./db');
createUser();
//createInformation();

app.listen(app.get('port'),()=>{
    console.log('Server in port ',`http://localhost:${app.get('port')}/api/`);
})