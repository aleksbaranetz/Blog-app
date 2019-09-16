const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
    Post.find()
    .sort({ date: -1})
    .then(posts => res.json(posts))
});

router.post('/', auth, (req, res) => {
    const newPost = new Post ({
        title: req.body.title,
        text: req.body.text
    });

    newPost.save().then(post => res.json(post));
});

router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).res.json({success: false}))
})



module.exports = router;