const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();

        //render index.handlebar inside main's body
        router.get('/',(req,res)=>{
            console.log(req.user);
            res.render("index",{user: req.user})
        }); 

        // router.get('/city',(req,res)=>{
        //     res.render("city",{user: req.user})
        // });

        // router.get('/attraction/',(req,res)=>{
        //     res.render("attraction",{user: req.user})
        // });

        // router.get('/edit-attraction',(req,res)=>{
        //     res.render("edit-attraction"),{user: req.user}
        // });

        
        return router;
    }
}