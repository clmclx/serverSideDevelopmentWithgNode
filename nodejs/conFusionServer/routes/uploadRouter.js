const express = require('express');
const bodyParser = require('body-parser');

const authenticate = require("../authenticate");
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'public/images');
   },
   filename: (req, file, cb) => {
       cb(null, file.originalname)
   }
});

const imageFileFilter = (req, file, cb) => {
    console.log('checking image');
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('the file you are trying to upload is not an image file'), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

// add all the methods for the / endpoint
uploadRouter.route('/')
    .options(cors.corsWithOptions, (req,res) => {
        res.sendStatus(200);
    }) // the requests need to be preflight
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
        console.log(`upload image`);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    });

module.exports = uploadRouter;



module.exports = uploadRouter;