const express = require ('express');
const  app = express();
const graphqlHTTP = require ('express-graphql');
/*var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');*/

const Schema = require ('./schema');  // Contient les information sur les données


app.use('/graphql', graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));
app.listen(4000);
console.log('Listenning .....');