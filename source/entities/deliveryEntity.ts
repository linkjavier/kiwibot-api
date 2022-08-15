import 'firebase/app'
import * as constants from '../constants'

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

class DeliveryEntity implements Delivery {
    id: string;
	creation_date: Date;
	state: "pending" | "assigned" | "in_transit" | "delivered";
	pickup: {
		pickup_lat: number;
		pickup_lon: number;
	}

	dropoff: {
		dropoff_lat: number;
		dropoff_lon: number;
	}
	zone_id: string;
    constructor(
        id: string,
        creation_date: Date,
        state: "pending" | "assigned" | "in_transit" | "delivered",
        pickup: {
            pickup_lat: number;
            pickup_lon: number;
        },
    
        dropoff: {
            dropoff_lat: number;
            dropoff_lon: number;
        },
        zone_id: string
    ) {
        this.id = id
        this.creation_date = creation_date
        this.state = state
        this.pickup = pickup
        this.dropoff = dropoff
        this.zone_id = zone_id
    }

    static fromData(id, state, pickup, dropoff, zone_id) {
        const creation_date = new Date()
        return new DeliveryEntity
            (null, creation_date, state, pickup, dropoff, zone_id)
    }

    static fromSnapshot(snapshot) { //firebase.firestore.DocumentSnapshot
        if (snapshot === null || snapshot === undefined) return
        return new DeliveryEntity
            (
                snapshot.id,
                snapshot.get(constants.COLLECTION_DELIVERIES_FIELD_CREATION_DATE),
                snapshot.get(constants.COLLECTION_DELIVERIES_FIELD_STATE),
                snapshot.get(constants.COLLECTION_DELIVERIES_FIELD_PICKUP),
                snapshot.get(constants.COLLECTION_DELIVERIES_FIELD_DROPOFF),
                snapshot.get(constants.COLLECTION_DELIVERIES_FIELD_ZONE_ID),
            )
    }

    static fromJson(json) {
        return new DeliveryEntity(
            json[constants.COLLECTION_DELIVERIES_FIELD_ID],
            json[constants.COLLECTION_DELIVERIES_FIELD_CREATION_DATE],
            json[constants.COLLECTION_DELIVERIES_FIELD_STATE],
            json[constants.COLLECTION_DELIVERIES_FIELD_PICKUP],
            json[constants.COLLECTION_DELIVERIES_FIELD_DROPOFF],
            json[constants.COLLECTION_DELIVERIES_FIELD_ZONE_ID],
        )
    }

    toMap() {
        return {
            [constants.COLLECTION_DELIVERIES_FIELD_ID]: this.id,
            [constants.COLLECTION_DELIVERIES_FIELD_CREATION_DATE]: this.creation_date,
            [constants.COLLECTION_DELIVERIES_FIELD_STATE]: this.state,
            [constants.COLLECTION_DELIVERIES_FIELD_PICKUP]: this.pickup,
            [constants.COLLECTION_DELIVERIES_FIELD_DROPOFF]: this.dropoff,
            [constants.COLLECTION_DELIVERIES_FIELD_ZONE_ID]: this.zone_id,
        }
    }
}

export default DeliveryEntity