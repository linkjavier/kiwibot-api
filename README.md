# kiwibot-api

In this application, I am going to use the following Node.js libraries.

- TypeScript: A TypeScript compiler with static set type definitions.
- Ts-node: Allows us to run and configure Typescript execution environments.
- Express: Node.js web application framework for setting and managing web-based server.
- @types/express: Type definitions for Express.
- Morgan: A Node.js HTTP request logger middleware for Node.js.
- @types/morgan: Type definitions for Morgan.
- Axios: A Node.js promise-based HTTP client library for Node.js, for sending HTTP requests to query and consume resources from APIs.
- @types/Axios: Type definitions for Axios.
- Nodemon: A server utility library for monitoring changes of the code on a text editor. It automatically restarts the server whenever code changes are detected.


This project consists of a node JS server, developed with Typescript, express and firebase.
In its first version it will have REST API with Endpoints for Deliveries and Bots. Creation, consultation and data of the entire collection.

== To start the proyect: ==

- On Root directory: npm install
- To start backend: npm run dev(port 6060)

== How to consume the API REST ==

- GET ALL DELIVERIES ==>  http://localhost:6060/deliveries
- GET A DELIVERY ==>  http://localhost:6060/deliveries/id
- POST ==> http://localhost:6060/deliveries


For POST: (Send Data with this structure)
== Delivery ==
{ 
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

== For Bots ==
{ 
	id: string
	status: "available" | "busy" | "reserved"
	location: {
		dropoff_lat: number
		dropoff_lon: number
	}
	zone_id: string
}