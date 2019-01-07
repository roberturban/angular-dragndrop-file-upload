const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
var fs = require('fs');

var FileModel = require('./model.ts');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'STORAGE_DIRECTORY/')
    },
    filename: (req, file, cb) => {
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
        console.log("Multer Error");
        res.status( 413 ).json({
          error : 'The file is too large'
        });
      } else if (fileValidation(req.file)){
        saveFileToDB(req.file.originalname, req.file.path, req.file.size).save()
          .then(game => {
            res.status( 200 ).send( req.file );
          })
          .catch(err => {
            res.status(400).send("Unable to save to Database");
          });
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

/**
* Database actions
*/

function saveFileToDB(filename, filepath, filesize) {
  let fileToSave = new FileModel({
    file_name: filename,
    file_path: filepath,
    file_size: filesize
  });
  return fileToSave;
}


function getAllFiles(req, res){
  FileModel.find({}, function (err, files){
    if(err) {
      console.log(err);
      res.status(500).json({
        error : 'Database Error'
      });
    } else {
      console.log(files);
      res.status(200).json(files);
    }
  });
}

module.exports = { handleUpload, getAllFiles }
