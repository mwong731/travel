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
        return router;
    }

    get(req,res){
        console.log(req.user);
        res.render('profile', {user: req.user});
    }

    myAttraction(req, res) {

        console.log("myattraction",req.params.id);
        return this.UserSubmitAttractionService.getAttractionByUser(req.params.id)
            .then(function(data){
                // console.log("data",data);
                res.json(data);
            })
            .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = profileRouter;
