const  express = require('express');
const  router = express.Router();
const  Post = require('../models/Post')

router.get('/', async (req, res)=>
{
  const posts = await Post.find();
  res.json(posts);
});


router.post('/',(req,res)=>
{
  const post = new Post({
    title:req.body.title,
    description:req.body.description
  });
    post.save()
    .then(data=>{
      res.json(data);
    })
    .catch(err=> {
        res.json({
          message:err
        })
    })
  });


  router.delete('/:id', (req, res) => {
    Post.remove({_id:req.params.id }).then(data => {
      res.send(data);
    }).catch(err => {
      res.send(err);
    })
  })


module.exports = router;

