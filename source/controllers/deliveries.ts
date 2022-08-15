/** source/controllers/deliveries.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import deliveriesRepository from '../repositories/deliveriesRepository';
import DeliveryEntity from '../entities/deliveryEntity'

interface Delivery { 
	id: string
	creation_date: Date
	state: "pending" | "assigned" | "in_transit" | "delivered"
	pickup: {
		pickup_lat: number
		pickup_lon: number
	}

	dropoff: {
		dropoff_lat: number
		dropoff_lon: number
	}
	zone_id: string
}

// Getting all Deliveries
const getDeliveries = async (req: Request, res: Response, next: NextFunction) => {
    // get some Deliveries
    let deliveries = await deliveriesRepository.getAll()
    return res.status(200).json({
        message: deliveries.map(delivery => delivery.toMap())
    });
};

// Getting a single delivery
const getDelivery = async (req: Request, res: Response, next: NextFunction) => {
    // get the delivery id from the req
    let id: string = req.params.id;
    // get the delivery
    let delivery = await deliveriesRepository.getDeliveryWithId(id)
    return res.status(200).json({
        message: delivery.toMap()
    });
};

// Adding a Delivery
const addDelivery = async (req: Request, res: Response, next: NextFunction) => {
    // add the delivery
    let newDelivery = await deliveriesRepository.createDelivery(req.body)
    // return response
    return res.status(200).json({
        message: newDelivery.toMap()
    });
};

export default { getDeliveries, getDelivery, addDelivery };