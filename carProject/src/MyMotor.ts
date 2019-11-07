import {Robot} from "./Robot";

export class MyMotor {
    constructor(private motor: Motor) {

    }

    rotate(targetAngle: number, speed: number): Promise<void> {
        return new Promise(async resolve => {
            await this.motor.resetEncoder();
            await Robot.sleep(10);

            if (targetAngle > 0) {
                await this.motor.setPower(speed);
                let intval = setInterval(async () => {
                    let motorPos = await this.motor.getEncoder();
                    if (motorPos >= targetAngle) {
                        await this.motor.setPower(0);
                        clearInterval(intval);
                        await Robot.sleep(10);
                        resolve();
                    }
                }, 20);
            } else {
                await this.motor.setPower(-speed);
                let intval = setInterval(async () => {
                    let motorPos = await this.motor.getEncoder();
                    if (motorPos <= targetAngle) {
                        await this.motor.setPower(0);
                        clearInterval(intval);
                        await Robot.sleep(10);
                        resolve();
                    }
                }, 20);
            }
        });
    }

    async rotateTo(targetPosition: number, speed: number) {
        return new Promise(async resolve => {

            if (await this.motor.getEncoder() < targetPosition) {
                await this.motor.setPower(speed);

                let prevPos = await this.motor.getEncoder();

                let intRval = setInterval(async () => {
                    let motorPos = await this.motor.getEncoder();
                    if (motorPos >= targetPosition) {
                        clearInterval(intRval);
                        await this.motor.setPower(0);
                        resolve();
                    }

                }, 10)
            } else {
                await this.motor.setPower(-speed);

                let intRval = setInterval(async () => {
                    let motorPos = await this.motor.getEncoder();
                    if (motorPos <= targetPosition) {
                        clearInterval(intRval);
                        await this.motor.setPower(0);
                        resolve();
                    }
                    console.log(motorPos);

                }, 10)
            }

        });

    }
}