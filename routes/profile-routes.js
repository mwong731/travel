const express = require("express");

class profileRouter{

    constructor(UserSubmitAttractionService){
        this.UserSubmitAttractionService = UserSubmitAttractionService;
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
        router.get("/myAttraction/:id", this.myAttraction.bind(this));
        router.get("/myPlan/:id", this.myPlan.bind(this));
        return router;
    }

    get(req,res){
        
        //format birthday
        function changedateformat(input) {
            var d = new Date(input);
            return [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/');
          }
          
        req.user.birthday=changedateformat(req.user.birthday);
        // console.log(req.user)
        
        res.render('profile', {user: req.user});
    }

    myAttraction(req, res) {
        

        console.log("myattraction",req.params.id);
        return this.UserSubmitAttractionService.getAttractionByUser(req.params.id)
            .then(function(data){
                res.json(data);
            })
            .catch((err)=>res.status(500).json(err));
    }

    myPlan(req, res) {
        

        console.log("myPlan",req.params.id);
        return this.UserSubmitAttractionService.getMyPlan(req.params.id)
            .then(function(data){
                res.json(data);
            })
            .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = profileRouter;
