const express = require('express');
const hb = require('express-handlebars');

let app = express();

/*handlebars*/
app.engine('handlebars', hb({ defaultLayout: 'main' })); //so that handlebar files can be used
app.set('view engine', 'handlebars');

app.use(express.static("public"));


const ViewRouter = require('./routes/viewRouter');


app.use('/',new ViewRouter().router()); // only requests to '/' will be sent to new router


app.listen(8080,()=>{
    console.log("Application started at port:8080");
});