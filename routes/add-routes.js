const express = require("express");

class addRouter{

    constructor(cityService){
        this.cityService = cityService;
    }

    router(){
        let router = express.Router();
        router.get("/attraction",this.get.bind(this));
        router.post("/attraction", this.post.bind(this));
        return router;
    }

    get(req,res){
        Promise.all([
            this.cityService.listCity()
        ]).then((data) => {
            if (data[0].length == 0) {
                console.log("data[0].length == 0");
                throw new Error("Select Return no result!!");
                //
            } else if (req.user.id == undefined) {
                throw new Error("User not login");
            } else {
                let datajson = {};
                //console.log(data[2]);
                datajson.city = data[0];
                datajson.user = [req.user];
                return datajson;
            }
        }).then((data) => {
            //throw new Error('test error');
            return res.render(("add-attraction"), data);
        }).catch((err) => {
            console.log(err);
            //return res.status(500).json(err);
            //for test only
            return res.redirect("/error");
        });
    }

    post(req, res) {
        console.log('user submit attraction', req.body)
        return this.AttractionService.insert(req.body.cityid, req.body.name, req.body.type, req.body.latitude, req.body.longitude, req.body.image, req.body.description, req.body.userid)
            .then(() => {
                console.log("inserted attraction")
                //res.json()
            })
            .catch((err) => res.status(500).json(err));
    }

    
}

module.exports = addRouter;