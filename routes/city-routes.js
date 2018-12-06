const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('city')
})


module.exports = router;