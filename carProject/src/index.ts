//const SensorArray = require("./SensorArray");
//const Chassis = require("./Chassis");
//let brickpi3 = require('brickpi3');
let mqtt = require("mqtt");
//const rxjs = require("rxjs");
//const {map, filter} = require("rxjs/operators");
//const SerialPort = require('serialport');
//const Readline = require('@serialport/parser-readline');
import {Robot} from "./Robot";


let client = mqtt.connect('mqtt://rpi-server:1883');

Robot.onInit().then(() => console.log("Vége"));


client.on('connect', () => {
    console.log("Connected to the broker.");

    client.publish('car/connected', 'true');

    client.subscribe('car/move');
    client.subscribe('car/move/left');
    client.subscribe('car/move/right');

});

client.on("message", (topic: string, payload: any) => {
    switch (topic) {
        case "car/move/left":
            console.log("Got command: LEFT");
            //motor.setPosition(360);
            break;
        case "car/move/right":
            console.log("Got command: RIGHT");
            //motor.setPosition(0);
            break;
    }
});