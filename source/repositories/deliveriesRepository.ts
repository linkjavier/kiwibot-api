import 'firebase/app'
import * as constants from '../constants'
import DeliveryEntity, * as deliveryEntity from '../entities/deliveryEntity'
import { firestore } from "../firebase";
import {  collection, query, doc, setDoc, getDoc, getDocs } from "@firebase/firestore";

export const COLLECTION_DELIVERIES : string = 'deliveries'

class DeliveriesRepository {
    async createDelivery(json: any) {
        if(!json){
            const error: any = new Error("Missing Json")
            error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }
        let id = json['id']
        const docRef = id === undefined ? doc(collection(firestore, "deliveries")) : doc(firestore, "deliveries", id)
        let entity = <DeliveryEntity>{};

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const error: any = new Error("Document already exist")
            error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
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

        if (!documentSnapshot.exists()) {
            const error: any = new Error("Order does not exist")
            error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }

        const answer = DeliveryEntity.fromSnapshot(documentSnapshot);
        return answer
    }

    async getAll() {

        const collectionRef = collection(firestore, "deliveries")
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const AllOrders = querySnapshot.docs.map(doc => DeliveryEntity.fromSnapshot(doc))
            return  AllOrders   
        }
        else {
            const error: any = new Error("No Deliveries")
            error.code = constants.HTTP_ANSWER_CODES_400_BAD_REQUEST
            throw(error)
        }        
          
    }
}

const DeliveriesRepositoryInstance = new DeliveriesRepository()
const deliveriesRepository = DeliveriesRepositoryInstance

export default deliveriesRepository