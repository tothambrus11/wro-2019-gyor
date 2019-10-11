import {Robot} from "./index";

const midPoint = 320;

export class Chassis {

    constructor(public leftMotor: any, public rightMotor: any) {
    }


    async followLine(breakFunction: () => boolean) {
        return await (
            new Promise((resolve, reject) => {
                let subscription = Robot.sensorArray.sensorData
                    .subscribe((sensorData: number[]) => {
                        if (sensorData) {
                            if (breakFunction()) {
                                subscription.unsubscribe();
                                resolve();
                                return;
                            }
                            if (sensorData[2] > midPoint) {
                                this.leftMotor.setPower(20);
                                this.rightMotor.setPower(10);
                                console.log("black")
                            } else {
                                this.leftMotor.setPower(10);
                                this.rightMotor.setPower(20);
                                console.log("white")
                            }
                        } else {
                            console.warn("No sensor data");
                        }
                    });
            })
        );


    }
}
