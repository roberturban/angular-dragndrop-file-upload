const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'STORAGE_DIRECTORY/')
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname + '-' + Date.now())
    }
})

// Add size limit to multer (20MB)
var maxSize = 2000000;
const fileUploadHandler = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  }
});

var handler = fileUploadHandler.single('file');

function handleUpload(req, res){
    handler(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log("multererror");
        res.status( 413 ).json({
          error : 'The file is too large'
        });
      } else if (fileValidation(req.file)){
        res.status( 200 ).send( req.file );
      }
    })
}

function fileValidation(file){
  // Example Verification after file is received - Already Saved File Handling missing
  if (file.mimetype.startsWith( 'audio/' )) {
    res.status( 422 ).json({
      error : 'The uploaded cannot be an audio file'
    });
    return false;
  } else {
    return true;
  }
}

module.exports = { handleUpload }
