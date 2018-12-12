const express = require("express");

class bookmarkRouter{

    constructor(bookmarkService){
        this.bookmarkService = bookmarkService;
    }

    router(){
        let router = express.Router();
        router.get("/:id",this.get.bind(this));
        router.post("/check",this.check.bind(this));
        router.post("/",this.post.bind(this));
        router.delete("/",this.delete.bind(this));
        return router;
    }

    get(req,res){
        
        return this.bookmarkService.listUserBookmark(req.params.id)
            .then(function(result){
                res.json(result);
            })
            .catch((err)=>res.status(500).json(err));
    }

    post(req,res){
        
        return this.bookmarkService.insertBookmark(req.body.userID, req.body.attractionID)
            .then(()=>{
                console.log("added new bookmark")
                res.json()})
            .catch((err)=>res.status(500).json(err));
    }

    delete(req,res){
        return this.bookmarkService.deleteBookmark(req.body.userID, req.body.attractionID)
            .then(()=>{
                console.log("deleted bookmark")
                res.json()})
            .catch((err)=> res.status(500).json(err));
    }

    check(req,res){
        
        return this.bookmarkService.getUserBookmarkWithUserIDAndAttractionID(req.body.userid, req.body.attractionid)
            .then(function(result){

               
                res.json(result);
            })
            .catch((err)=>res.status(500).json(err));
    }

    
}

module.exports = bookmarkRouter;