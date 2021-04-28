const app = require('./app');
const cors = require('cors');

app.use(cors());

require('./db');

app.listen(app.get('port'),()=>{
    console.log('Server in port ',`http://localhost:${app.get('port')}/api/`);
})