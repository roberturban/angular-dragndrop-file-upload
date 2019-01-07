const express = require('express');
const path = require('path');

/**
 * bodyparser
 */
const bodyParser = require( 'body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


/**
* Setup express server
*/
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;
const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});


/**
* Setup DB connection
*/
const mongoose = require('mongoose');
const config = require('./config.ts');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);


/**
* FileUpload routes
*/
const fileUpload = require('./fileUpload/fileUpload.ts');
app.post('/fileUpload', fileUpload.handleUpload);
