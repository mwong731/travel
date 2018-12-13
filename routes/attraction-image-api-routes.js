const express = require("express");
var path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'public/assets/uploads/')
   },
   // filename: function (req, file, cb) {
   //    cb(null, file.fieldname + '-' + Date.now())
   // }
})

var uploading = multer({ storage: storage })

class AttractionImageAPIRouter {
   constructor(attractionImageService) {
      this.attractionImageService = attractionImageService;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
      router.post("/single/:id", uploading.single('image'), this.singleUpload.bind(this));
      router.post("/muti/:id", uploading.array('image'), this.mutiUpload.bind(this));
      router.post("/delete/", this.deleteImg.bind(this));
      return router;
   }

   async get(req, res) {
      return this.attractionImageService.getImageAttractionByAttractionID(req.params.id)
         .then((data) => {
            //console.log(data)
            res.json(data);
         })
         .catch((err) => res.status(500).json(err));
   }
   singleUpload(req, res) {
      console.log(req.file);
      console.log(req.file.filename);
      let insertObj = {attractionid:req.params.id , image:`/assets/uploads/${req.file.filename}`};
      return this.attractionImageService.insertImage(insertObj).then((data) => {
         console.log(data)
      });
   }

   mutiUpload(req, res) {
      let insertObj = [];
      req.files.forEach(element => {
         insertObj.push({attractionid:req.params.id , image:`/assets/uploads/${element.filename}`})
      });
      return this.attractionImageService.insertImageArray(insertObj).then((data) => {
         console.log(data);
      });
   }

   deleteImg(req, res) {

      // need modify
      //console.log(req.body.ids);
      let insertObj = [];
      req.body.ids.forEach(element => {
         //console.log(element.id);
         insertObj.push(element.id);
      })
      return this.attractionImageService.deleteImage(insertObj).then((data) => {
         console.log(data);
      });;
   }

}
module.exports = AttractionImageAPIRouter