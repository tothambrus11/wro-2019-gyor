import {SensorArray} from "./SensorArray";
import {Chassis} from "./Chassis";
import {Command, Commander} from "./Commander";
import {Lifter} from "./Lifter";

const brickpi3 = require('brickpi3');

let BP = new brickpi3.BrickPi3();

brickpi3.utils.resetAllWhenFinished(BP);

export class Robot {
    static sensorArray: SensorArray;
    static chassis: Chassis;
    static commander: Commander;
    static lifter: Lifter;

    static async onInit() {
        //Get the instance of the motors
        let motorA = brickpi3.utils.getMotor(BP, BP.PORT_A);
        let motorB = brickpi3.utils.getMotor(BP, BP.PORT_B);
        let motorC = brickpi3.utils.getMotor(BP, BP.PORT_C);
        let motorD = brickpi3.utils.getMotor(BP, BP.PORT_D);

        //Reset the motors encoder to 0; Wait for all to finish in parallel
        console.log('Resetting motor encoder...');
        await Promise.all([
            motorA.resetEncoder(),
            motorB.resetEncoder(),
            motorC.resetEncoder(),
            motorD.resetEncoder()
        ]);

        Robot.chassis = new Chassis(motorC, motorB);
        Robot.sensorArray = new SensorArray("/dev/ttyACM0", 8);
        Robot.commander = new Commander();
        Robot.lifter = new Lifter(motorA, motorD);

        console.log("Initializing sensor array...");
        await Robot.sleep(3000);

        await this.commander.execute([
           // Command.PICK_UP_FRONT_LEFT,
            Command.GO_FORWARD,
            Command.PICK_UP_FRONT_LEFT,
            Command.PICK_UP_FRONT_RIGHT
        ]);


        await this.lifter.resetGearShiftMotor();

        await this.chassis.leftMotor.setPower(0);
        await this.chassis.rightMotor.setPower(0);
        console.log("Megvártuk az előző promise-t és most már fut tovább a kód");
    }

    static sleep(time: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time)
        });
    }


}