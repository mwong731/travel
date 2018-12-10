const express = require("express");

class cityRouter{

    constructor(cityService){
        this.cityService = cityService;
    }

    router(){
        let router = express.Router();
        router.get("/:id",this.get.bind(this));
        return router;
    }

    get(req,res){
        return this.cityService.getCity(req.params.id)
            .then(function(data){
                // console.log("data",data);
                res.render(("city"),data);
            })
            .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = cityRouter;