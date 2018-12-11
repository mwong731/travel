const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();

        //render index.handlebar inside main's body
        router.get('/',(req,res)=>{
            console.log(req.user);
            res.render("index",{user: req.user})
        }); 


        
        return router;
    }
}