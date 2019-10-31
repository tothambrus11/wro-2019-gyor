import {Robot} from "./Robot";
import {Lift, LiftState} from "./Lifter";

export class Commander {
    async execute(commands: Command[]){
        for (let i = 0; i < commands.length; i++) {
            switch (commands[i]) {
                case Command.TURN_LEFT:
                    await Robot.chassis.turn(-1, 500, 20, Robot.sensorArray);
                    break;
                case Command.TURN_RIGHT:
                    await Robot.chassis.turn(1, 500, 20, Robot.sensorArray);
                    break;
                case Command.GO_FORWARD:
                    await Robot.chassis.goUntilBlack(400, 40);
                    await Robot.chassis.goForward(0.5, 20);
                    break;
                case Command.PICK_UP_FRONT_LEFT:
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.5, 20);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.UP);
                    await Robot.chassis.goForward(-0.5, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_FRONT_RIGHT:
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.5, 20);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.UP);
                    await Robot.chassis.goForward(-0.5, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_REAR_LEFT:
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.5, 20);
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.UP);
                    await Robot.chassis.goForward(-0.5, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_REAR_RIGHT:
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.5, 20);
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.UP);
                    await Robot.chassis.goForward(-0.5, 20);
                    await Robot.sleep(10);

                    break;
                case  Command.PUT_DOWN_FRONT_LEFT:
                     break;
                case  Command.PUT_DOWN_FRONT_RIGHT:
                    break;
                case  Command.PUT_DOWN_REAR_LEFT:
                    break;
                case Command.PUT_DOWN_REAR_RIGHT:
                    break;
            }
        }

    }
}

export enum Command{
    TURN_LEFT,
    TURN_RIGHT,
    GO_FORWARD,
    PICK_UP_FRONT_LEFT,
    PICK_UP_FRONT_RIGHT,
    PICK_UP_REAR_LEFT,
    PICK_UP_REAR_RIGHT,
    PUT_DOWN_FRONT_LEFT,
    PUT_DOWN_FRONT_RIGHT,
    PUT_DOWN_REAR_LEFT,
    PUT_DOWN_REAR_RIGHT
}