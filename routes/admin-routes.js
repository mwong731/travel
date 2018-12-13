const express = require("express");

class adminRouter{

    constructor(UserSubmitAttractionService){
        this.UserSubmitAttractionService = UserSubmitAttractionService;
        this.authCheck = (req,res,next)=>{
            if(!req.user){
                // if user is not logged in
                res.redirect('/auth/login')
            } else if(req.user.usertype!='admin'){
                res.redirect('/auth/login')

            } else{
                // if user is logged in
                next()
            }
        };
    }

  

    router(){
        let router = express.Router();
        router.get("/",this.authCheck,this.get.bind(this));
        router.get("/list",this.list.bind(this));
        router.get("/attraction/:id",this.attraction.bind(this));
        router.post("/accept", this.accept.bind(this));
        router.post("/decline",this.decline.bind(this));

        return router;
    }

    get(req,res){
        
        res.render('admin', {user: req.user});
    }

    list(req,res){
        
        return this.UserSubmitAttractionService.getAttractionPending()
        .then((data) => {
            //console.log("list data",data)
            res.json(data)
        })
        .catch((err) => res.status(500).json(err));
    }

    attraction(req,res){
        
        return this.UserSubmitAttractionService.getAttractionByAttractionID(req.params.id)
        .then((data) => {
            
            res.json(data)
        })
        .catch((err) => res.status(500).json(err));
    }

    accept(req,res){
     
        return this.UserSubmitAttractionService.confirmAttractionStatusByAdmin(req.body.id)
        .then(() => {
            res.json("success")
        })
        .catch((err) => res.status(500).json(err));
    }

    decline(req,res){
        
        
        return this.UserSubmitAttractionService.declineAttractionStatusByAdmin(req.body.id)
        .then(() => {
            res.json("success")
        })
        .catch((err) => res.status(500).json(err));
    }

   

    
}

module.exports = adminRouter;
