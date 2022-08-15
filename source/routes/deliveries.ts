import express from 'express';
import Deliverycontroller from '../controllers/deliveries';
const router = express.Router();

router.get('/deliveries', Deliverycontroller.getDeliveries);
router.get('/deliveries/:id', Deliverycontroller.getDelivery);
router.post('/deliveries', Deliverycontroller.addDelivery);

export = router;