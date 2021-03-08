var express = require('express');
var router = express.Router();
var Users = require('../models/User')

/* GET users listing. */
router.get('/', async (req, res) => {​​​​​​​​
const users = awaitUsers.find();
res.send(users);
}​​​​​​​​);

router.post('/', (req, res) => {​​​​​​​​
const user = Users.new({​​​​​​​​
first_name:req.body.first_name,
last_name:req.body.last_name,
contact_number:req.body.contact_number,
email_id:req.body.email,
password:req.body.password
  }​​​​​​​​)
user.save().then(data=> {​​​​​​​​
res.send(data);
  }​​​​​​​​).catch(err=>{​​​​​​​​
res.send(err);
  }​​​​​​​​)
}​​​​​​​​);

module.exports = router;

