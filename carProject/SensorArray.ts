import {fromEvent, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

export class SensorArray {
    public sensorData: Observable<number[]>;

    constructor(public readonly portName: string, public readonly sensorLength: number) {

        const USBSerialPort = new Readline();
        const port = new SerialPort(portName, {baudRate: 9600});

        port.pipe(USBSerialPort);

        this.sensorData = fromEvent(USBSerialPort, "data")
            .pipe(
                map((line: string) => {
                    return line.slice(0, line.length - 2).split(",").map((data) => Number(data.trim()));
                }),
                filter((sensorData: number[]) => sensorData.length === sensorLength)
            );

    }
}