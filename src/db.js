const mongoose = require('mongoose');
mongoose.connect(process.env.HOST_DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(db=>console.log('db conectect'))
.catch(err=>console.log(err))
