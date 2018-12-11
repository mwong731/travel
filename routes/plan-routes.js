const express = require("express");

class itineraryRouter{
    constructor(itineraryService){
        this.itineraryService = itinearyService;
    }
    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.delete("/",this.delete.bind(this));
        return router;
    }

    get(req,res){
        console.log('welcome to itinerary page')
        
        return this.bookmarkService.listUserBookmark(req.params.id)
            .then(function(result){
                res.json(result);
            })
            .catch((err)=>res.status(500).json(err));
    }
}