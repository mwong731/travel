const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index")); //render index.handlebar inside main's body
        // router.get('/users',(req,res)=>res.render("users"));
        // router.get('/groups',(req,res)=>res.render("groups"));
        return router;
    }
}