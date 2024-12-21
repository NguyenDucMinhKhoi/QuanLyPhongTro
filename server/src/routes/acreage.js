import express from 'express';
import * as controller from '../controllers/acreage'  
//CRUD
const router = express.Router()

router.get('/all', controller.getAcreages)

export default router;