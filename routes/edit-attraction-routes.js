const express = require("express");

class editAttractionRouter {

    constructor(attractionService ,attractionImageService) {
        this.attractionService = attractionService;
        this.attractionImageService = attractionImageService;
    }

    router() {
        let router = express.Router();
        router.get("/:id", this.get.bind(this));
        router.post("/", this.post.bind(this));
        return router;
    }

    get(req, res) {
        Promise.all([
            this.attractionService.getAttractionInAttractionID(req.params.id)
            ,
            this.attractionImageService.listAttractionCommentsByAttractionID(req.params.id)
         ]).then((data) => {
            if (data[0].length == 0) {
               throw new Error ("Select Return no result!!");
            } else {
               let datajson = {};
               console.log(data[0]);
               datajson.attraction = data[0];
               datajson.attractionComments = data[1];
               datajson.attractionImage = data[2];
               datajson.bookmark = data[3];
               datajson.user = {};
               return datajson;
            }
         }).then((data) => {
            //throw new Error('test error');
            return res.render(("attraction"), data);
         }).catch((err) => {
            console.log(err);
            //return res.status(500).json(err);
            //for test only
            return res.status(500).render('edit-attraction', { errorMessage: err });
            //return res.status(500).render('index', { errorMessage: err });
         });
    }

    post(req, res) {
        console.log('filter city', req.body)

        return this.cityService.filter(req.body)
            .then((result) => {
                console.log("result", result)
                res.json(result)
            })
            .catch((err) => res.status(500).json(err));
    }


}

module.exports = editAttractionRouter;