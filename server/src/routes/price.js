import express from 'express';
import * as controller from '../controllers/price'  
//CRUD
const router = express.Router()

router.get('/all', controller.getPrices)

export default router;