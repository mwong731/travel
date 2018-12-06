const express = require('express');

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index")); //render index.handlebar inside main's body
        router.get('/attraction',(req,res)=>res.render("attraction"));
        router.get('/edit-attraction',(req,res)=>res.render("edit-attraction"));

        router.get('/profile',(req,res)=>res.render("profile"));
        return router;

      
    }
}