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
        
        return res.render("plan",{user:req.user});
    }

    async post(req,res){
        try{
            console.log(req.body);
            let planId = await this.planService.insertPlan(req.user.id,req.body.planname);
            console.log(planId[0]);
            let inputArr = req.body.attractionArr;
            
            inputArr.forEach(element => {
                this.planService.insertAttractioninplan(planId[0],element).then(console.log('data inserted'));
                
            });
            res.send('done');
        }
        catch(err){
            return res.send(err);
        }
    }
}

module.exports = planRouter;