const express =require('express');
const router  = express.Router() ;



router.get('/' ,(req,res) => {
  res.json ({
     message : "How Are you"
  }); 
});

router.post('/signup', (req,res) => {
  console.log('body',req.body)
 res.json({
   message : "You Are Awesome!!!"
  });
});

module.exports = router ;