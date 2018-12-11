const express = require("express");

class editAttractionRouter {

    constructor(attractionService, attractionImageService , cityService) {
        this.attractionService = attractionService;
        this.attractionImageService = attractionImageService;
        this.cityService = cityService;
    }

    router() {
        let router = express.Router();
        router.get("/:id", this.get.bind(this));
        //router.post("/", this.post.bind(this));
        return router;
    }

    get(req, res) {
        Promise.all([
            this.attractionService.getAttractionInAttractionID(req.params.id)
            ,
            this.attractionImageService.getImageAttractionByAttractionID(req.params.id)
            ,
            this.cityService.listCity()
        ]).then((data) => {
            // console.log("data[0]");
            // console.log(data);
            // console.log("data[0]");
            if (data[0].length == 0) {
                console.log("data[0].length == 0");
                throw new Error("Select Return no result!!");
            } else if(data[0][0].userid != req.user.id) {
                //console.log("data[0].userid is "+ data[0].userid);
                //console.log("req.user.id is "+req.user.id);
                throw new Error("User not login");
                //return res.redirect("/attraction/"+req.params.id);
            }else{
                let datajson = {};
                console.log(data[0]);
                datajson.attraction = data[0];
                datajson.attractionImage = data[1];
                datajson.user = [req.user];
                return datajson;
            }
        }).then((data) => {
            //throw new Error('test error');
            return res.render(("edit-attraction"), data);
        }).catch((err) => {
            console.log(err);
            //return res.status(500).json(err);
            //for test only
            return res.redirect("/error");
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