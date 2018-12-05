const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index")); //render index.handlebar inside main's body
        router.get('/city',(req,res)=>res.render("city"));
        router.get('/attraction',(req,res)=>res.render("attraction"));
        // router.get('/groups',(req,res)=>res.render("groups"));
        return router;

      
    }
}