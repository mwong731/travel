const express = require("express");
class AttractionImageAPIRouter {
   constructor(attractionImageService) {
      this.attractionImageService = attractionImageService;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
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

}
module.exports = AttractionImageAPIRouter