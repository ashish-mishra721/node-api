var express = require('express');
var router = express.Router();
var Users = require('../models/User')

/* GET users listing. */
router.get('/', async (req, res) => {
  const users = await Users.find();
  res.send(users);
});

router.post('/', (req, res) => {
  const user = new Users({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contact_number,
    email_id: req.body.email,
    password: req.body.password,
    gender: req.body.gender
  })
  user.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  })
});

router.delete('/:id', (req, res) => {
  Users.remove({_id:req.params.id }).then(data => {
    res.send(data);
  }).catch(err => {
    res.send(err);
  })
})

router.put('/', (req, res) => {
  console.log(req.params.id);
  Users.findOneAndRemove({_id:req.params.id }).then(data => {
    res.send(200, "Recod deleted ");
  }).catch(err => {
    res.send(err);
  })
})

module.exports = router;
