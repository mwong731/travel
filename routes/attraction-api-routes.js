const express = require("express");
class AttractionApiroutesRouter {
   constructor(AttractionApiroutesRouter) {
      this.attractionApiroutesRouter = AttractionApiroutesRouter;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
      return router;
   }

   async get(req, res) {
      return this.attractionApiroutesRouter.getAttractionInAttractionID(req.params.id)
         .then(function (result) {
            res.json(result);
         })
         .catch((err) => res.status(500).json(err));
   }

}
module.exports = AttractionApiroutesRouter