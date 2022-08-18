/** source/controllers/deliveries.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import deliveriesRepository from '../repositories/deliveriesRepository';
import DeliveryEntity from '../entities/deliveryEntity'
const name = '/v1/deliveries'

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
    //rawHeaders[5] ---> An ID
    console.log(`uuid[${req.rawHeaders[5]}] Executing GET /api${name}`)
    try {
        let deliveries = await deliveriesRepository.getAll()
    
        if (deliveries != undefined) {
            return res.status(200).json({
                message: deliveries.map(delivery => delivery?.toMap())
            });
        }
    }
    catch(error) {
        return res.status(400).json({
            message: "Error on getting deliveries or NO DELIVERIES"
        })
    }
};

// Getting a single delivery
const getDelivery = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`uuid[${req.rawHeaders[5]}] Executing GET /api${name}/${req.params.id}`)

    try {
        // get the delivery id from the req
        let id: string = req.params.id;
        // get the delivery
        let delivery = await deliveriesRepository.getDeliveryWithId(id)
    
        if (delivery != undefined){
            return res.status(200).json({
                message: delivery.toMap()
            });
        }
    }

    catch(error) {
        return res.status(400).json({
            message: "Error on getting delivery. ID doesn't exist?"
        })
    }
};

// Adding a Delivery
const addDelivery = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`uuid[${req.rawHeaders[5]}] Executing POST /api${name}`)
    try {
        // Add the delivery
        let newDelivery = await deliveriesRepository.createDelivery(req.body)
        // Return response
        if (newDelivery != undefined) {
            return res.status(200).json({
                message: newDelivery.toMap()
            });
        }
    }
    catch(error) {
        return res.status(400).json({
            message: "Error on Delivery Creation"
        })
    }
};

export default { getDeliveries, getDelivery, addDelivery };