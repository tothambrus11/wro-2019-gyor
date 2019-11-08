import {SensorArray} from "./SensorArray";
import {Robot} from "./Robot";
import {MyMotor} from "./MyMotor";

export class Chassis {

    leftMyMotor: MyMotor;
    rightMyMotor: MyMotor;

    constructor(public leftMotor: Motor, public rightMotor: Motor) {
        this.leftMyMotor = new MyMotor(leftMotor);
        this.rightMyMotor = new MyMotor(rightMotor);
    }

    followLine(breakFunction: (sensorData: number[]) => boolean, baseSpeed: number, k: number, shouldStop: boolean = true) {
        return new Promise((resolve) => {

                let subscription = Robot.sensorArray.sensorData
                    .subscribe(async (sensorData: number[]) => {
                        //console.log("ASD");
                        console.log(sensorData);
                        if (breakFunction(sensorData)) {
                            if(shouldStop){
                                await Promise.all([
                                    this.leftMotor.setPower(0),
                                    this.rightMotor.setPower(0)
                                ]);
                                console.log("BREAK");
                            }
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

    goUntilBlack(minimumRunning: number, speed: number = 40, shouldStop: boolean = true) {
        let t0 = getTime();

        return Robot.chassis.followLine((sensorData) => {
            return SensorArray.isBlack(sensorData[0]) &&
                SensorArray.isBlack(sensorData[sensorData.length - 1]) &&
                getTime() - t0 > minimumRunning;
        }, speed, speed / 4, shouldStop);
    }

    async goForward(rotations: number, baseSpeed: number, shouldStop: boolean = true): Promise<void> {


        return new Promise(async resolve => {

            await Promise.all([
                this.leftMotor.resetEncoder(),
                this.rightMotor.resetEncoder()
            ]);


            let leftMotorPos: number = 0, rightMotorPos: number = 0, avgPos: number = 0;

            let k = 1;

            if (rotations > 0) {
                let intRval = setInterval(async () => {
                    if (avgPos >= rotations * 360) {
                        clearInterval(intRval);
                        if(shouldStop){
                            await Promise.all([
                                this.rightMotor.setPower(0),
                                this.leftMotor.setPower(0)
                            ]);
                        }
                        console.log("went forward");
                        resolve();
                    } else {
                        leftMotorPos = await this.leftMotor.getEncoder();
                        rightMotorPos = await this.rightMotor.getEncoder();
                        avgPos = (leftMotorPos + rightMotorPos) * 0.5;

                        let error = leftMotorPos - rightMotorPos;
                        await Promise.all([
                            this.rightMotor.setPower(baseSpeed + error * k),
                            this.leftMotor.setPower(baseSpeed - error * k)
                        ]);
                    }
                }, 10);


            } else {
                let intRval = setInterval(async () => {
                    if (avgPos <= rotations * 360) {
                        clearInterval(intRval);
                        if(shouldStop){
                            await Promise.all([
                                this.leftMotor.setPower(0),
                                this.rightMotor.setPower(0)
                            ]);
                        }
                        console.log("went forward");
                        resolve();
                    } else {
                        leftMotorPos = await this.leftMotor.getEncoder();
                        rightMotorPos = await this.rightMotor.getEncoder();
                        avgPos = (leftMotorPos + rightMotorPos) * 0.5;

                        let error = leftMotorPos - rightMotorPos;
                        await Promise.all([
                            this.leftMotor.setPower(-baseSpeed - error * k),
                            this.rightMotor.setPower(-baseSpeed + error * k)
                        ]);
                    }
                }, 10);

            }
        });


    }


    turn(turns: number, baseSpeed: number) {
        let degrees: number = 194;

        sleep(100);

        return new Promise(async resolve => {
            await this.leftMotor.resetEncoder();
            await this.rightMotor.resetEncoder();

            let leftInitPos = await this.leftMotor.getEncoder();
            let rightInitPos = await this.rightMotor.getEncoder();

            let leftMotorPos: number = 0, rightMotorPos: number = 0, avgPos: number = 0;

            let k = 1;

            if (turns > 0) {
                let intRval = setInterval(async () => {
                    if (avgPos >= turns * degrees) {
                        clearInterval(intRval);
                        await Promise.all([
                            this.leftMotor.setPower(0),
                            this.rightMotor.setPower(0)
                        ]);
                        console.log("turned");
                        resolve();
                    } else {

                        leftMotorPos = await this.leftMotor.getEncoder() - leftInitPos;
                        rightMotorPos = await this.rightMotor.getEncoder() - rightInitPos;
                        avgPos = (Math.abs(leftMotorPos) + Math.abs(rightMotorPos)) * 0.5;

                        let error = leftMotorPos + rightMotorPos;
                        await Promise.all([
                            this.leftMotor.setPower(baseSpeed - error * k),
                            this.rightMotor.setPower(-baseSpeed - error * k)
                        ]);
                    }
                }, 10);

            } else {
                let intRval = setInterval(async () => {
                    if (avgPos >= -turns * degrees) {
                        clearInterval(intRval);
                        await Promise.all([
                            this.leftMotor.setPower(0),
                            this.rightMotor.setPower(0)
                        ]);
                        console.log("turned");
                        resolve();
                    } else {

                        leftMotorPos = await this.leftMotor.getEncoder();
                        rightMotorPos = await this.rightMotor.getEncoder();
                        avgPos = (Math.abs(leftMotorPos) + Math.abs(rightMotorPos)) * 0.5;

                        let error = rightMotorPos + leftMotorPos;
                        await Promise.all([
                            this.leftMotor.setPower(-baseSpeed - error * k),
                            this.rightMotor.setPower(baseSpeed - error * k)
                        ])
                    }
                }, 10);

            }
        });

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
