const express = require("express");
const userid = 1;
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

   async get(req, res) {
      Promise.all([
         this.attractionService.getAttractionInAttractionID(req.params.id)
         ,
         this.attractionCommentService.listAttractionCommentsByAttractionID(req.params.id)
         ,
         this.attractionImageService.getImageAttractionByAttractionID(req.params.id)
         ,
         //need get user id;
         this.bookmarkService.getUserBookmarkWithUserIDAndAttractionID(userid, req.params.id)
      ]).then((data) => {
         if (data[0].length == 0) {
            throw new Error("Select Return no result!!");
         } else {
            let datajson = {};
            // console.log(req.user);
            datajson.attraction = data[0];
            datajson.attractionComments = data[1];
            datajson.attractionImage = data[2];
            datajson.bookmark = data[3];
            datajson.user = req.user;
            //console.log(datajson);
            return datajson;
         }
      }).then((data) => {
         //throw new Error('test error');
         return res.render(("attraction"), data);
      }).catch((err) => {
         console.log(err);
         //return res.status(500).json(err);
         //for test only
         return res.redirect("/error");
         //return res.status(500).render('edit-attraction', { errorMessage: err });
         //return res.status(500).render('index', { errorMessage: err });
      });
   }

   createComment(req, res) {
      console.log(req.body);
      // console.log(req.user);
      this.attractionCommentService.insertComment(userid, req.params.id, req.body.text, req.body.rate).then();
      return res.redirect('back');
   }

}
module.exports = AttractionRouter