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
        router.get("/:id",this.authCheck,this.read.bind(this));
        router.post("/",this.post.bind(this));
        router.post("/:id",this.update.bind(this));
        return router;
    }

    get(req,res){
        return res.render("plan",{user:req.user});
    }

    async post(req,res){
        try{
            
            let planId = await this.planService.insertPlan(req.user.id,req.body.planname,req.body.plandays);
            
            let inputArr = req.body.attractionArr;
            
            inputArr.forEach(element => {
                this.planService.insertAttractioninplan(planId[0],element).then(console.log('data inserted' +JSON.stringify(element)));
                
            });
            res.send('done');
        }
        catch(err){
            return res.send(err);
        }
    }

    read(req, res) {
        let planData = [];

        return Promise.all([this.planService.readAttractionplan(req.params.id),
            this.planService.readPlan(req.params.id)])
            .then(function (data) {
                planData = JSON.stringify(data);
                res.render("plan-edit", { data: planData });
            })
            .catch((err) => res.status(500).json(err));
    }

    async update(req,res){
        
        let planId = req.params.id;

        await this.planService.deleteAllAttractionInPlanByPlanID(planId);

        let inputArr = req.body.attractionArr;

        inputArr.forEach(element => {
            this.planService.insertAttractioninplan(planId,element).then(console.log('data inserted' + JSON.stringify(element)));
            
        });
        res.send('done');
    }

    

    
}

module.exports = planRouter;