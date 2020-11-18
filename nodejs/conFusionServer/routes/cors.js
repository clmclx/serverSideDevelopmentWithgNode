/**
 * CORS related information
 * */

const express = require('express');
const cors  =  require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  // check if the header origin is whitelisted
  if(whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = {origin: true}; //the origin is allowed to be accepted. The client will know that it is ok to accept calls from this origin.
  } else {
      corsOptions = {origin: false};
  }

  callback(null,corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);