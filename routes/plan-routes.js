const express = require("express");

class planRouter{
    constructor(planService,cityService){
       this.planService = planService;
       this.cityService = cityService;
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
        
        return res.render("plan",{user:req.user});
    }

    async post(req,res){
        try{
            let planId = await this.planService.insertPlan(req.user.id,req.body.planname);
            console.log(planId[0]);
            // suppose receive 
            // let  = await this.planService.insertAttractioninplan(planId[0])
        }
        catch(err){
            return res.send(err);
        }
    }
}

module.exports = planRouter;