import 'firebase/app'
import * as constants from '../constants'
import DeliveryEntity, * as deliveryEntity from '../entities/deliveryEntity'
import { firestore } from "../firebase";
import {  collection, query, doc, setDoc, getDoc, getDocs } from "@firebase/firestore";

export const COLLECTION_DELIVERIES : string = 'deliveries'

interface json { 
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

class DeliveriesRepository {
    async createDelivery(json: json) {
        if(!json){
            const error = new Error("Missing Json")
            // error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }
        let id = json['id']
        const docRef = id === undefined ? doc(collection(firestore, "deliveries")) : doc(firestore, "deliveries", id)
        let entity = <DeliveryEntity>{};

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const error = new Error("Document already exist")
            // error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }
        else {
            // Inyection of dates and False to IsDeleted
            const date = new Date()
            json[constants.COLLECTION_DELIVERIES_FIELD_CREATION_DATE] = date

            // doc.data() will be undefined in this case
            entity = DeliveryEntity.fromJson(json)

            if(entity.id === null || entity.id === undefined || entity.id === '')
            entity.id = docSnap.id

            await setDoc(docRef, json);
            const answer = DeliveryEntity.fromSnapshot(await getDoc(docRef))
    
            return answer
        }
    }

    async getDeliveryWithId(deliveryId: string) {
        if(deliveryId === undefined || deliveryId === null || deliveryId === '') return null

        const docRef = doc(firestore, "deliveries", deliveryId)
        const documentSnapshot = await getDoc(docRef);

        if (documentSnapshot.exists()) {
            const answer = new DeliveryEntity(documentSnapshot.data());
    
            return answer
        }
        else {
            const error = new Error("Order does not exist")
            // error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }
    }

    async getAll() {

        const collectionRef = collection(firestore, "deliveries")
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q)
        const AllOrders = querySnapshot.docs.map(doc => DeliveryEntity.fromSnapshot(doc))
        
        return  AllOrders     
    }
}

const DeliveriesRepositoryInstance = new DeliveriesRepository()
const deliveriesRepository = DeliveriesRepositoryInstance

export default deliveriesRepository