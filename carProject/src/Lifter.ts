import {Robot} from "./Robot";

export class Lifter {
    constructor(private movingMotor: Motor,
                private gearShiftMotor: Motor) {

    }

    private gearShiftMotorAngle = 0;
    private movingMotorAngle = 0;

    async resetGearShiftMotor() {
        if (this.gearShiftMotorAngle !== 0) {
            await this.gearShiftMotor.setPosition(0);
        }
    }

    async move(lift: Lift, lifterState: LiftState) {
        await Robot.sleep(100);

        let rate = ((lifterState == LiftState.UP || lifterState == LiftState.DOWN) ? 2.5 : 1.2);

        console.log("Rate: " + rate);
        let targetPos = ((lifterState == LiftState.DOWN || lifterState == LiftState.MIDDLE_DOWN) ? -rate * 360 : rate * 360);

        let speed = lifterState == LiftState.UP || lifterState == LiftState.MIDDLE_UP ? 100 : 50;

        console.log("target pos: " + targetPos);


        switch (lift) {
            case Lift.REAR_LEFT:
                await this.gearShiftMotor.setPosition(90, 50);
                this.gearShiftMotorAngle = 90;
                break;
            case Lift.FRONT_RIGHT:
                await this.gearShiftMotor.setPosition(180, 50);
                this.gearShiftMotorAngle = 180;
                break;
            case Lift.FRONT_LEFT:
                await this.gearShiftMotor.setPosition(270, 50);
                this.gearShiftMotorAngle = 270;
                break;
            case Lift.REAR_RIGHT:
                await this.gearShiftMotor.setPosition(0, 50);
                this.gearShiftMotorAngle = 0;
                break;
        }
        await Robot.sleep(10);

        this.movingMotorAngle += targetPos;

        await this.movingMotor.setPosition(this.movingMotorAngle, speed);
        await Robot.sleep(200);

    }
}

export enum Lift {
    FRONT_LEFT = 0,
    FRONT_RIGHT = 1,
    REAR_LEFT = 2,
    REAR_RIGHT = 3
}

export enum LiftState {
    UP,
    DOWN,
    MIDDLE_UP,
    MIDDLE_DOWN
}