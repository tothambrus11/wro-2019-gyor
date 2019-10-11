"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
class SensorArray {
    constructor(portName, sensorLength) {
        this.portName = portName;
        this.sensorLength = sensorLength;
        const USBSerialPort = new Readline();
        const port = new SerialPort(portName, { baudRate: 9600 });
        port.pipe(USBSerialPort);
        this.sensorData = rxjs_1.fromEvent(USBSerialPort, "data")
            .pipe(operators_1.map((line) => {
            return line.slice(0, line.length - 2).split(",").map((data) => Number(data.trim()));
        }), operators_1.filter((sensorData) => sensorData.length === sensorLength));
    }
}
exports.SensorArray = SensorArray;
//# sourceMappingURL=SensorArray.js.map