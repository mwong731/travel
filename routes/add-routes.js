const express = require("express");

class addRouter{

    constructor(UserSubmitAttractionService){
        this.UserSubmitAttractionService = UserSubmitAttractionService;
    }

    router(){
        let router = express.Router();
        router.get("/attraction",this.get.bind(this));
        router.post("/attraction", this.post.bind(this));
        return router;
    }

    get(req,res){
        res.render("edit-attraction",{data:'Add',user:req.user})
    }

    post(req, res) {
        console.log('user submit attraction', req.body)

        return this.UserSubmitAttractionService.insertAttraction(req.body.cityid, req.body.name, req.body.type, req.body.latitude, req.body.longitude, req.body.image, req.body.description, req.body.userid)
            .then(() => {
                console.log("inserted attraction")
                res.json()
            })
            .catch((err) => res.status(500).json(err));
    }

    
}

module.exports = addRouter;