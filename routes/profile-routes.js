const router = require('express').Router();

const authCheck = (req,res,next)=>{
    if(!req.user){
        // if user is not logged in
        res.redirect('/auth/login')
    } else{
        // if user is logged in
        next()
    }
};
router.get('/',authCheck,(req,res)=>{
    console.log(req.user);
    res.render('profile', {user: req.user});
})

router.get('/myAttraction/:id',function(req,res){
    console.log("myattraction",req.params.id);
    return this.cityService.getCity(req.params.id)
            .then(function(data){
                // console.log("data",data);
                res.render(("city"),data);
            })
            .catch((err)=>res.status(500).json(err));
})

module.exports = router; 

