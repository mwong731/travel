const express = require("express");
class AttractionRouter {
   constructor(attractionService) {
      this.attractionService = attractionService;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
      // router.post("/", this.post.bind(this));
      // router.put("/:id", this.put.bind(this));
      // router.patch("/:id", this.put.bind(this));
      // router.delete("/:id", this.delete.bind(this));
      return router;
   }

   get(req, res) {
      //Validation Logic
      console.log(req.params.id);
      return this.attractionService.getAttractionInAttractionID(req.params.id)
         .then((data) => res.json(data))
         .catch((err) => res.status(500).json(err));
   }

}
module.exports = AttractionRouter