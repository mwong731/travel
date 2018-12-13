const express = require("express");

class planRouter{
    constructor(planService){
       this.planService = planService;
       this.authCheck = (req,res,next)=>{
        if(!req.user){
            // if user is not logged in
            res.redirect('/auth/login')
        } else{
            // if user is logged in
            next()
        }
    };
    }
    router(){
        let router = express.Router();
        router.get("/",this.authCheck,this.get.bind(this));
        router.get("/:id",this.read.bind(this));
        router.post("/",this.post.bind(this));
        // router.delete("/",this.delete.bind(this));
        return router;
    }

    get(req,res){
        console.log('welcome to itinerary page')
        
        return res.render("plan",{user:req.user});
    }

    read(req,res){
        let planData = [];
        console.log('welcome to plan id: ' + req.params.id );
        return this.planService.readAttractionplan(req.params.id)
            .then(function(data){
                // res.render("plan-edit",{data:data})
                console.log(data);
                
                planData = JSON.stringify(data);
                res.render("plan-edit",{data: planData})
            })
            .catch((err)=>res.status(500).json(err));
    }


    async post(req,res){
        try{
            console.log(req.body);
            let planId = await this.planService.insertPlan(req.user.id,req.body.planname,req.body.plandays);
            console.log(planId[0]);
            let inputArr = req.body.attractionArr;
            
            inputArr.forEach(element => {
                this.planService.insertAttractioninplan(planId[0],element).then(console.log('data inserted' + element));
                
            });
            res.send('done');
        }
        catch(err){
            return res.send(err);
        }
    }

    

    
}

module.exports = planRouter;