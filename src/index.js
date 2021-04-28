const app = require('./app');

require('./db');

app.listen(app.get('port'),()=>{
    console.log('Server in port ',`http://localhost:${app.get('port')}/api/`);
})