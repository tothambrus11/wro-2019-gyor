import {SensorArray} from "./SensorArray";
import {Robot} from "./Robot";

export class Chassis {

    constructor(public leftMotor: Motor, public rightMotor: Motor) {
    }

    followLine(breakFunction: (sensorData: number[]) => boolean, baseSpeed: number, k: number) {
        return new Promise((resolve) => {

                let subscription = Robot.sensorArray.sensorData
                    .subscribe(async (sensorData: number[]) => {
                        console.log("ASD");
                        if (breakFunction(sensorData)) {
                            await Promise.all([
                                this.leftMotor.setPower(0),
                                this.rightMotor.setPower(0)
                            ]);
                            console.log("BREAK");
                            subscription.unsubscribe();
                            await sleep(10);
                            resolve();
                        } else {
                            let lineFollowingSensors = sensorData;

                            let sum: number = 0;
                            let valueSum: number = 0;


                            lineFollowingSensors.forEach((value, index) => {
                                sum += value * (index + 1);
                                valueSum += value;
                            });

                            let index = sum / valueSum - 1;
                            let error = ((lineFollowingSensors.length - 1) / 2) - index;

                            let leftSpeed = baseSpeed - error * k;
                            let rightSpeed = baseSpeed + error * k;

                            await Promise.all([
                                this.leftMotor.setPower(leftSpeed),
                                this.rightMotor.setPower(rightSpeed),
                            ]);
                        }
                    });
            }
        );


    }

    goUntilBlack(minimumRunning: number, speed: number = 40) {
        let t0 = getTime();

        return Robot.chassis.followLine((sensorData) => {
            return SensorArray.isBlack(sensorData[0]) &&
                SensorArray.isBlack(sensorData[sensorData.length - 1]) &&
                getTime() - t0 > minimumRunning;
        }, speed, speed / 5);
    }

    async goForward(rotations: number, speed: number): Promise<void> {
        await sleep(100);

        await Promise.all([
            this.leftMotor.resetEncoder(),
            this.rightMotor.resetEncoder()
        ]);
        await sleep(10);
        console.log("Motor encoders reset.");
        await Promise.all([
            this.leftMotor.setPosition(rotations * 360, speed),
            this.rightMotor.setPosition(rotations * 360, speed)
        ]);
        await sleep(100);
        console.log("Goforward után");

    }

    turn(turns: number, minimumRunning: number, speed: number, sensorArray: SensorArray): Promise<void> {

        let t0 = getTime();

        if (turns < 0) {

            return new Promise(async resolve => {
                await sleep(100);

                await Promise.all([
                    this.leftMotor.setPower(-speed),
                    this.rightMotor.setPower(speed)
                ]);

                let subscription = sensorArray
                    .sensorData
                    .subscribe(async values => {
                        if (SensorArray.isBlack(values[4]) && (getTime() - t0 > minimumRunning)) {
                            await Promise.all([
                                this.leftMotor.setPower(0),
                                this.rightMotor.setPower(0)
                            ]);
                            subscription.unsubscribe();
                            await sleep(100);

                            resolve();
                        }
                    })
            });


        } else {
            return new Promise(async resolve => {
                await sleep(100);

                await Promise.all([
                    this.leftMotor.setPower(speed),
                    this.rightMotor.setPower(-speed)
                ]);

                let subscription = sensorArray.sensorData.subscribe(async values => {
                    if (SensorArray.isBlack(values[3]) && (getTime() - t0 > minimumRunning)) {
                        subscription.unsubscribe();

                        await Promise.all([
                            this.leftMotor.setPower(0),
                            this.rightMotor.setPower(0),
                        ]);

                        await sleep(100);

                        resolve();
                    }
                })

            });
        }
    }
}


/**
 * Get the current time in milliseconds
 */
function getTime(): number {
    return (new Date()).getTime();
}


function sleep(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time)
    });
}
