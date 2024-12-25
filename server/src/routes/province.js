import express from 'express';
import * as controller from '../controllers/province'  
//CRUD
const router = express.Router()

router.get('/all', controller.getProvinces)

export default router;