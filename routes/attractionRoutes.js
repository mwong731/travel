const express = require("express");
class AttractionRouter {
   constructor(attractionService, attractionCommentService, attractionImageService, bookmarkService) {
      this.attractionService = attractionService;
      this.attractionCommentService = attractionCommentService;
      this.attractionImageService = attractionImageService;
      this.bookmarkService = bookmarkService;
   }
   router() {
      let router = express.Router();
      router.get("/", this.main.bind(this));
      router.get("/:id", this.get.bind(this));
      router.post("/createComment/:id", this.createComment.bind(this));
      // router.put("/:id", this.put.bind(this));
      // router.patch("/:id", this.put.bind(this));
      // router.delete("/:id", this.delete.bind(this));
      return router;
   }

   main(req, res) {
      return res.redirect('back');
      //return res.redirect('/404');
   }

   get(req, res) {
      Promise.all ([
         this.attractionService.getAttractionInAttractionID(req.params.id)
         ,
         this.attractionCommentService.listAttractionCommentsByAttractionID(req.params.id)
         ,
         this.attractionImageService.getImageAttractionByAttractionID(req.params.id)
         ,
         //need get user id;
         this.bookmarkService.getUserBookmarkWithUserIDAndAttractionID(1, req.params.id)
      ]).then((data) => {
         console.log('this is the data 0:' , data[0]);
         console.log('this is the data 1:' , data[1]);
         console.log('this is the data 2:' , data[2]);
         console.log('this is the data 3:' , data[3]);
         let datajson = {};
         datajson.attraction = data[0];
         datajson.attractionComments = data[1];
         datajson.attractionImage = data[2];
         datajson.bookmark = data[3];
         return datajson;
      }).then((data) => {
         // console.log(data)
         //throw new Error('test error');
         return res.render(("attraction"), data);
      }).catch((err) => {
         console.log(err);
         //return res.status(500).json(err);
         return res.status(500).render('index', { errorMessage: err });
      });
   }

   createComment(req, res) {
      this.attractionCommentService.in
      return res.render(("/index"));
   }

}
module.exports = AttractionRouter