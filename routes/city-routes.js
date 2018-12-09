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
        console.log('render city name: ', req.params.id)
        
        return this.cityService.getCity(req.params.id)
            .then(function(data){
                console.log("data",data);
                // var temp_data = JSON.stringify(data);
                res.render(("city"),{data: JSON.stringify(data)});
            })
            .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = cityRouter;