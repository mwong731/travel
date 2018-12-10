const express = require("express");

class bookmarkRouter{

    constructor(bookmarkService){
        this.bookmarkService = bookmarkService;
    }

    router(){
        let router = express.Router();
        router.get("/:id",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){
        console.log('list user bookmark: ', req.params.id)
        
        return this.bookmarkService.listUserBookmark(req.params.id)
            .then(function(result){
                res.json(result);
            })
            .catch((err)=>res.status(500).json(err));
    }

    post(req,res){
        console.log('add new bookmark', req.body)
        
        return this.bookmarkService.insertBookmark(req.body)
            .then((result)=>{
                console.log("result",result)
                res.json(result)})
            .catch((err)=>res.status(500).json(err));
    }

    delete(req,res){
        console.log('deleting bookmark', req.params.id)
        return this.bookmarkService.deleteBookmark(req.params.id)
            .then(()=>{
                console.log("deleted bookmark is ",result)
                res.json(result)
            })
            .catch((err)=> res.status(500).json(err));
    }

    
}

module.exports = bookmarkRouter;