const { createComment, createPost, deletePost, getOnePost, getPosts, likePost, updatePost } = require('../controllers/posts.controller.ts');
const { auth } = require('../middleware/auth.js');
const { createAuth } = require('../middleware/createAuth.js');
const router = require("express").Router();

//prefix added (localhost:8080/posts)
router.get('/', getPosts);
router.get('/:id', getOnePost);
router.post('/', createAuth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',  deletePost);
router.patch('/:id/likePost', console.log('like'));

module.exports = router; 