const express = require("express");

class addRouter{

    constructor(UserSubmitAttractionService){
        this.UserSubmitAttractionService = UserSubmitAttractionService;
    }

    router(){
        let router = express.Router();
        router.get("/attraction",this.get.bind(this));
        return router;
    }

    get(req,res){
        res.render("edit-attraction",{data:'Add'})
        // return this.UserSubmitAttractionService.getCity(req.params.id)
        //     .then(function(data){
        //         // console.log("data",data);
        //         res.render(("edit-attraction"),data);
        //     })
        //     .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = addRouter;