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

    if (deliveries != undefined) {
        return res.status(200).json({
            // message: deliveries.map(delivery => delivery.toMap())
            message: deliveries.map(delivery => delivery?.toMap())
        });
    }
    else {
        return res.status(400).json({
            message: "Error on getting deliveries"
        })
    }
};

// Getting a single delivery
const getDelivery = async (req: Request, res: Response, next: NextFunction) => {
    // get the delivery id from the req
    let id: string = req.params.id;
    // get the delivery
    let delivery = await deliveriesRepository.getDeliveryWithId(id)

    if (delivery != undefined){
        return res.status(200).json({
            message: delivery.toMap()
        });
    }
    else {
        return res.status(400).json({
            message: "Error on getting delivery"
        })
    }

};

// Adding a Delivery
const addDelivery = async (req: Request, res: Response, next: NextFunction) => {
    // add the delivery
    let newDelivery = await deliveriesRepository.createDelivery(req.body)
    // return response

    if (newDelivery != undefined) {
        return res.status(200).json({
            message: newDelivery.toMap()
        });
    }
    else {
        return res.status(400).json({
            message: "Error on Delivery Creation"
        })
    }

};

export default { getDeliveries, getDelivery, addDelivery };