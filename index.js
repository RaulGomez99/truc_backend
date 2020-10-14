const express       = require('express');
const mongoose      = require('mongoose');
const app           = express();
const { mongo_url }  = require('./env.json');

(async function initApp(){
    app.use(express.json());

    await initDb();

    const port = process.env.PORT || 3001;
    app.use("/api", require('./app/routes/api.routes'))
    app.listen(port,() => console.log("Listen on port "+port));
})();

async function initDb(){
    await mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}