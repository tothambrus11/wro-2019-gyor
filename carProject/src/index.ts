//const SensorArray = require("./SensorArray");
//const Chassis = require("./Chassis");
//let brickpi3 = require('brickpi3');
import {Observable} from "rxjs";

let mqtt = require("mqtt");
//const rxjs = require("rxjs");
//const {map, filter} = require("rxjs/operators");
//const SerialPort = require('serialport');
//const Readline = require('@serialport/parser-readline');
import {Robot} from "./Robot";


export let client = mqtt.connect('mqtt://192.168.43.74:1883');


Robot.client = client;
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