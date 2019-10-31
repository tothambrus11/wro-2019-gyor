"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const midPoint = 320;
class SensorArray {
    constructor(portName, sensorLength) {
        this.portName = portName;
        this.sensorLength = sensorLength;
        const USBSerialPort = new Readline();
        const port = new SerialPort(portName, { baudRate: 115200 });
        port.pipe(USBSerialPort);
        this.sensorData = rxjs_1.fromEvent(USBSerialPort, "data")
            .pipe(operators_1.map((line) => {
            return line.slice(0, line.length - 1).split(",").map((data) => Number(data.trim()));
        }), operators_1.filter((sensorData) => sensorData.length === sensorLength));
        this.sensorData.subscribe(value => SensorArray.lastSensorData = value);
    }
    static isBlack(number) {
        return number > midPoint;
    }
}
exports.SensorArray = SensorArray;
//# sourceMappingURL=SensorArray.js.map