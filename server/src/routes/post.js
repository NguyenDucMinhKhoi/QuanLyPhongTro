import express from 'express';
import * as postController from '../controllers/post';
import upload from '../middlewares/upload';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router()

router.get('/all', postController.getPosts)
router.get('/limit', postController.getPostsLimit)
router.get('/new-post', postController.getNewPosts)
router.post('/create', verifyToken, upload.array('images', 10), postController.createPost)

export default router   