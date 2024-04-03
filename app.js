const bodyParser = require('body-parser');
const express = require('express');
const route = require('./routes.js');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

/** Routes */
app.use('/',route);

/** View Renderer */
app.set('views','./views');
app.use(express.static('./assets'));
app.set('view engine','ejs');

/** Server */
const port = 8080;
const server = app.listen(port,() => {
    console.log('Running on port',port);
});