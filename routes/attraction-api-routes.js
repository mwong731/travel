const express = require("express");
class AttractionApiroutesRouter {
   constructor(attractionService,attractionImageService) {
      this.attractionService = attractionService;
      this.attractionImageService=attractionImageService;
   }
   router() {
      let router = express.Router();
      router.get("/:id", this.get.bind(this));
      router.post("/", this.post.bind(this));
      return router;
   }

   async get(req, res) {
      
      let object={};

      return Promise.all([ this.attractionService.getAttractionInAttractionID(req.params.id),
            this.attractionService.getImageAttractionByAttractionID(req.params.id) ])
            .then((data)=>{
            //      console.log("data0",data[0],"data1",data[1]) 
                  object=data[0];
                  object.image=(data[1])[0];
            //      console.log('object',object)
                 res.json([data[0],(data[1])[0]])
            })
            .catch((err) => res.status(500).json(err));
   }

   post (req , res){
      console.log(req.body.formArray.insertAttraction);
      return this.attractionService.insert()
   }

}
module.exports = AttractionApiroutesRouter