const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const db = require('../db/connection.js');
const users = db.get('users');

users.createIndex('username', {
  unique: true
});



const router = express.Router();


const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(2).max(30).required(),
  password: Joi.string().trim().min(10).required()
});


router.get('/', (req, res) => {
  res.json({
    message: "How Are you"
  });
});

router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then((user) => {
      if (user) {
        const error = new Error('this username is unavailable');
        next(error);
      } else {
        bcrypt.hash(req.body.password.trim(), 12).then((hashedPassword) => {
          const newUser = {
            username: req.body.username,
            password: hashedPassword
          };
          users.insert(newUser).then((insertedUser) => {
            delete insertedUser.password ;
            res.json(insertedUser);
          });
        });
      }
    });
  } else {
    next(result.error);
  }
});

module.exports = router;