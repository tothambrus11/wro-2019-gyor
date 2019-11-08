import {Observable} from "rxjs";

let mqtt = require("mqtt");
import {Robot} from "./Robot";

export const serverIP = "192.168.43.74";
export let client = mqtt.connect('mqtt://' + serverIP + ':1883');


Robot.client = client;
Robot.serverIP = serverIP;

Robot.onInit().then(() => console.log("Vége"));

client.on('connect', () => {
    console.log("Connected to the broker.");

    client.publish('car/connected', 'true');

    client.subscribe('car/move');
    client.subscribe('car/move/left');
    client.subscribe('doloooog');
    client.subscribe('car/move/right');

});

Robot.MQTT = new Observable(subscriber => {
    client.on("message", (topic: string, payload: any) => {
        subscriber.next({topic, message: payload});
    });
});

Robot.MQTT.subscribe(mqttMessage => {
    console.log(mqttMessage);
});