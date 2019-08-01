const express =require('express');

const Joi = require('joi');
const router  = express.Router() ;


const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30).required(),
  password: Joi.string().min(10).required()
});


router.get('/' ,(req,res) => {
  res.json ({
     message : "How Are you"
  }); 
});

router.post('/signup', (req,res) => {
  const result = Joi.validate(req.body,schema);
 res.json(result);
});

module.exports = router ;

