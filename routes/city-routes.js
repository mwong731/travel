const express = require("express");

class cityRouter{

    constructor(cityService){
        this.cityService = cityService;
    }

    router(){
        let router = express.Router();
        router.get("/:id",this.get.bind(this));
        router.get("/",this.cannotGet.bind(this));
        return router;
    }

    get(req,res){
       
            return this.cityService.getCity(req.params.id)
            .then(function(data){
                if(data.error){
                    res.status(404).render("error")
                }else{
                    res.render(("city"),{data:data,user:req.user});
                }
                // console.log("data",data);   
            })
            .catch((err)=>res.status(500).json(err));
        }

    cannotGet(req,res){
        res.status(404).render("error")
    }
       
    
    
}

module.exports = cityRouter;