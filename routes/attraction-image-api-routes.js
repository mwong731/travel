const express = require("express");
class AttractionImageAPIRouter {
   constructor(attractionImageService) {
      this.attractionImageService = attractionImageService;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
      router.post("/:id",this.post.bind(this));
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
   post(req,res){
      // need modify
      console.log(req.body);
      return res.send("data");
   }

}
module.exports = AttractionImageAPIRouter