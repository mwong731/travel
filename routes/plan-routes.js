const express = require("express");

class planRouter{
    constructor(planService){
       this.planService = planService;
    }
    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        // router.delete("/",this.delete.bind(this));
        return router;
    }

    get(req,res){
        console.log('welcome to itinerary page')
        
        return res.render("plan");
    }

    post(req,res){
        
    }
}

module.exports = planRouter;