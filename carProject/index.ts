/*const SensorArray = require("./SensorArray");
const Chassis = require("./Chassis");

let brickpi3 = require('brickpi3');
let mqtt = require("mqtt");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const rxjs = require("rxjs");
const {map} = require("rxjs/operators");
*/


import {fromEvent, Observable} from "rxjs";
import {root} from "rxjs/internal-compatibility";
import {Chassis} from "./Chassis";
import {SensorArray} from "./SensorArray";

const {map, filter} = require("rxjs/operators");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const brickpi3 = require('brickpi3');
const mqtt = require("mqtt");

let client = mqtt.connect('mqtt://192.168.137.1:1883');


let BP = new brickpi3.BrickPi3();

brickpi3.utils.resetAllWhenFinished(BP);

export class Robot {
    static sensorArray: SensorArray;
    static chassis: Chassis;

    static async onInit() {
        //Get the instance of the motors
        let motorA = brickpi3.utils.getMotor(BP, BP.PORT_C);
        let motorC = brickpi3.utils.getMotor(BP, BP.PORT_C);
        let motorB = brickpi3.utils.getMotor(BP, BP.PORT_B);
        let motorD = brickpi3.utils.getMotor(BP, BP.PORT_C);

        //Reset the motors encoder to 0; Wait for all to finish in parallel
        await Promise.all([
            motorA.resetEncoder(),
            motorB.resetEncoder(),
            motorC.resetEncoder(),
            motorD.resetEncoder()
        ]);

        Robot.chassis = new Chassis(motorC, motorB);
        Robot.sensorArray = new SensorArray("/dev/ttyACM0", 6);

        console.log('Motor encoder reset.');


        let shouldStop = false;
        setTimeout(() => {
            shouldStop = true;
        }, 10000);
        let count = 0;
        this.sensorArray.sensorData.subscribe((data: number[]) => {
            count++;
        });

        await Robot.chassis.followLine(() => shouldStop);

        console.log("NUMBER: " + count + "; n/s" + (count / 10));
        console.log("Megvártuk az előző promise-t és most már fut tovább a kód");
    }
}

//Robot.onInit();

Robot.onInit();

client.on('connect', () => {
    console.log("Connected to the broker...");

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




