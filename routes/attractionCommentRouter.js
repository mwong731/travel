const express = require("express");
class AttractionCommentRouter {
   constructor(attractionCommentService) {
      this.attractionCommentService = attractionCommentService;
   }
   router() {
      let router = express.Router();
      router.get("/:attractionid", this.get.bind(this));
      // router.post("/", this.post.bind(this));
      // router.put("/:id", this.put.bind(this));
      // router.patch("/:id", this.put.bind(this));
      // router.delete("/:id", this.delete.bind(this));
      return router;
   }

   get(req, res) {
      //Validation Logic
      console.log(req.params.attractionid);
      return this.attractionCommentService.listAttractionCommentsByAttractionID(req.params.attractionid)
         .then((data) => res.json(data))
         .catch((err) => res.status(500).json(err));
   }

}
module.exports = AttractionCommentRouter