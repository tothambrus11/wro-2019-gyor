import {Robot} from "./Robot";
import {Lift, LiftState} from "./Lifter";

export class Commander {

    distances: number[][][];

    constructor(public map: Field[][]) {

    }

    async execute(commands: Command[]) {
        for (let i = 0; i < commands.length; i++) {
            switch (commands[i]) {
                case Command.TURN_LEFT:
                    await Robot.chassis.turn(-1, 15);
                    break;
                case Command.TURN_RIGHT:
                    await Robot.chassis.turn(1, 15);
                    break;
                case Command.GO_FORWARD:
                    let shouldStop = false;
                    let speed = 40;
                    if (commands[i + 1] && commands[i + 1] != Command.GO_FORWARD) {
                        shouldStop = true;
                        speed = 30;
                    }
                    if (commands[i + 1] && !this.isMovingCommand(commands[i + 1])) {
                        speed = 30;
                    }
                    if (commands[i + 1] != Command.GO_FORWARD) {
                        speed = 30
                    }
                    if (commands[i - 1] != Command.GO_FORWARD) {
                        speed = 30
                    }
                    if (commands[i + 1] && this.isTurningCommand(commands[i + 1]) && commands[i + 2] && !this.isMovingCommand(commands[i + 2])) {
                        speed = 30;
                    }
                    await Robot.chassis.goUntilBlack(400, speed, false);
                    await Robot.chassis.goForward(0.41, speed, shouldStop);
                    break;
                case Command.PICK_UP_FRONT_LEFT:
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.UP);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_FRONT_RIGHT:
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.UP);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_REAR_LEFT:
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.UP);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.sleep(10);

                    break;
                case Command.PICK_UP_REAR_RIGHT:
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.UP);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.sleep(10);

                    break;
                case  Command.PUT_DOWN_FRONT_LEFT:
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.UP);
                    await Robot.sleep(10);
                    break;
                case  Command.PUT_DOWN_FRONT_RIGHT:
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.UP);
                    await Robot.sleep(10);

                    break;
                case  Command.PUT_DOWN_REAR_LEFT:
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.REAR_LEFT, LiftState.UP);
                    await Robot.sleep(10);
                    break;
                case Command.PUT_DOWN_REAR_RIGHT:
                    await Robot.chassis.goForward(-0.35, 20);
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.DOWN);
                    await Robot.chassis.goForward(0.35, 20);
                    await Robot.lifter.move(Lift.REAR_RIGHT, LiftState.UP);
                    await Robot.sleep(10);
                    break;

                case Command.PICK_UP_FRONT_LEFT_WAREHOUSE:
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.MIDDLE_DOWN);
                    await Robot.chassis.goForward(0.3, 30);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.MIDDLE_UP);
                    await Robot.chassis.goForward(-0.3, 30);

                       /* PICK_UP_FRONT_RIGHT_WAREHOUSE = 12,
                        PICK_UP_REAR_LEFT_WAREHOUSE = 13,
                        PICK_UP_REAR_RIGHT_WAREHOUSE = 14,
                        PUT_DOWN_FRONT_LEFT_WAREHOUSE = 15,
                        PUT_DOWN_FRONT_RIGHT_WAREHOUSE = 16,
                        PUT_DOWN_REAR_LEFT_WAREHOUSE = 17,
                        PUT_DOWN_REAR_RIGHT_WAREHOUSE = 18*/
                   break;
                case Command.PUT_DOWN_FRONT_LEFT_WAREHOUSE:
                    await Robot.chassis.goForward(0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.MIDDLE_DOWN);
                    await Robot.chassis.goForward(-0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_LEFT, LiftState.MIDDLE_UP);

                    Robot.client.publish("warehouse/inputArrived", "2 3");

                    console.log("PUBLISHEDDDDDD");
                    break;

                case Command.PUT_DOWN_FRONT_RIGHT_WAREHOUSE:
                    await Robot.chassis.goForward(0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.MIDDLE_DOWN);
                    await Robot.chassis.goForward(-0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.MIDDLE_UP);

                    Robot.client.publish("warehouse/inputArrived", "2 3");

                    console.log("PUBLISHEDDDDDD");
                    break;

                case Command.PICK_UP_FRONT_RIGHT_WAREHOUSE:
                    await Robot.chassis.goForward(0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.MIDDLE_DOWN);
                    await Robot.chassis.goForward(-0.22, 30);
                    await Robot.lifter.move(Lift.FRONT_RIGHT, LiftState.MIDDLE_UP);
                    break;
            }
        }
    }

    isMovingCommand(command: Command): boolean {
        return moveCommands.findIndex(value => value == command) != -1;
    }

    isTurningCommand(command: Command): boolean {
        return command == Command.TURN_LEFT || command == Command.TURN_RIGHT;
    }


    isNeighbour(pos1: Position, pos2: Position) {
        return ((Math.abs(pos1.x - pos2.x) == 1 && pos1.y == pos2.y) || (Math.abs(pos1.y - pos2.y) == 1 && pos1.x == pos2.x)) &&
            pos1.x >= 0 && pos1.x < this.map.length && pos1.y >= 0 && pos1.y < this.map[0].length &&
            pos2.x >= 0 && pos2.x < this.map.length && pos2.y >= 0 && pos2.y < this.map[0].length;
    }

    calculateDistances(pos: Position) {
        this.distances = [];
        for (let i = 0; i < this.map.length; i++) {
            this.distances.push([]);
            for (let j = 0; j < this.map[0].length; j++) {
                this.distances[i].push([]);
                for (let k = 0; k < 4; k++) {
                    this.distances[i][j].push(-1);
                }
            }
        }

        this.distances[pos.x][pos.y][pos.dir] = 0;

        let isFinished: boolean = false;

        let knownPositions: Position[] = [];
        knownPositions.push(pos);
        let dist: number = 0;
        while (!isFinished) {
            isFinished = true;
            dist++;

            let newKnownPositions: Position[] = [];
            for (let i = 0; i < knownPositions.length; i++) {
                for (let j = 0; j < moveCommands.length; j++) {
                    let pos1: Position = knownPositions[i];
                    let newPos: Position = this.getPositionByCommand(moveCommands[j], pos1);
                    if (this.isConnected(newPos, pos1)) {
                        if (this.distances[newPos.x][newPos.y][newPos.dir] == -1) {
                            newKnownPositions.push(newPos);
                            this.distances[newPos.x][newPos.y][newPos.dir] = dist;
                            isFinished = false;
                        }
                    }

                }
            }
            //console.log(dist);

            knownPositions = [];
            for (let i = 0; i < newKnownPositions.length; i++) {
                knownPositions.push(newKnownPositions[i]);
            }
        }
    }


    /**
     *
     *
     * @param startPos az autó jelenlegi pozíciója
     * @param packPositions a felvevendő csomagok helyei
     * @param carriedThings a nálunk levő csomagok célállomásainak a pozíciói
     *
     * alapesetben egy pozíciónak az armIndex-e lehet null
     * ha egy csomagot a warehouse-ba viszünk vagy onnan kell felvennünk, akkor a warehouse helye (6, 0)
     *      ebben az esetben a dir lehet null, viszont kell armIndex (a belső hely ami közelebb van a warehouse rakodórendszeréhez):
     *          letevés a külső helyre: Arm.RIGHT_FRONT_DOWN
     *          letevés a belső helyre: Arm.LEFT_FRONT_DOWN
     *          felvevés a külső helyről: Arm.LEFT_FRONT_UP
     *          felvevés a belső helyről: Arm.RIGHT_FRONT_UP
     *
     */

    getPlan(startPos: Position, packPositions: Position[], carriedThings: Position[]): { thingPos: Position, commandList: Command[] } {
        let commandList: Command[] = [];

        let allDestinations: Position[] = [];

        allDestinations = this.getPutDownPositions(carriedThings);

        for (let i = 0; i < packPositions.length; i++) {
            arrayMerge(allDestinations, [this.getPickupPositions(packPositions[i], carriedThings)]);
        }

        // console.log(allDestinations);

        let endPos: Position = this.getClosestDestination(startPos, allDestinations);

        let carPos: Position = clonePos(startPos);

        while (this.measureDistance(carPos, endPos) > 0) {
            for (let i = 0; i < moveCommands.length; i++) {
                let newPos: Position = this.getPositionByCommand(moveCommands[i], carPos);

                if (this.measureDistance(carPos, endPos) > this.measureDistance(newPos, endPos) && this.measureDistance(newPos, endPos) != -1) {
                    carPos = clonePos(newPos);
                    commandList.push(moveCommands[i]);
                }
            }
        }


        if (this.map[endPos.x][endPos.y].fieldType == 0)
            switch (endPos.armIndex) {
                case Arm.LEFT_FRONT_DOWN:
                    commandList.push(Command.PUT_DOWN_FRONT_LEFT_WAREHOUSE);
                    break;

                case Arm.RIGHT_FRONT_DOWN:
                    commandList.push(Command.PUT_DOWN_FRONT_RIGHT_WAREHOUSE);
                    break;

                case Arm.RIGHT_REAR_DOWN:
                    commandList.push(Command.PUT_DOWN_REAR_RIGHT_WAREHOUSE);
                    break;

                case Arm.LEFT_REAR_DOWN:
                    commandList.push(Command.PUT_DOWN_REAR_LEFT_WAREHOUSE);
                    break;


                case Arm.LEFT_FRONT_UP:
                    commandList.push(Command.PICK_UP_FRONT_LEFT_WAREHOUSE);
                    break;

                case Arm.RIGHT_FRONT_UP:
                    commandList.push(Command.PICK_UP_FRONT_RIGHT_WAREHOUSE);
                    break;

                case Arm.RIGHT_REAR_UP:
                    commandList.push(Command.PICK_UP_REAR_RIGHT_WAREHOUSE);
                    break;

                case Arm.LEFT_REAR_UP:
                    commandList.push(Command.PICK_UP_REAR_LEFT_WAREHOUSE);
                    break;
            }
        else switch (endPos.armIndex) {
            case Arm.LEFT_FRONT_DOWN:
                commandList.push(Command.PUT_DOWN_FRONT_LEFT);
                break;

            case Arm.RIGHT_FRONT_DOWN:
                commandList.push(Command.PUT_DOWN_FRONT_RIGHT);
                break;

            case Arm.RIGHT_REAR_DOWN:
                commandList.push(Command.PUT_DOWN_REAR_RIGHT);
                break;

            case Arm.LEFT_REAR_DOWN:
                commandList.push(Command.PUT_DOWN_REAR_LEFT);
                break;


            case Arm.LEFT_FRONT_UP:
                commandList.push(Command.PICK_UP_FRONT_LEFT);
                break;

            case Arm.RIGHT_FRONT_UP:
                commandList.push(Command.PICK_UP_FRONT_RIGHT);
                break;

            case Arm.RIGHT_REAR_UP:
                commandList.push(Command.PICK_UP_REAR_RIGHT);
                break;

            case Arm.LEFT_REAR_UP:
                commandList.push(Command.PICK_UP_REAR_LEFT);
                break;

        }

        return {commandList: commandList, thingPos: endPos};
    }

    isConnected(pos1: Position, pos2: Position): boolean {
        if (this.isNeighbour(pos1, pos2)) {
            let x1 = pos1.x;
            let y1 = pos1.y;
            let x2 = pos2.x;
            let y2 = pos2.y;

            if (x1 < x2) return this.map[x1][y1].openSides[1] == true && this.map[x2][y2].openSides[3] == true;
            else if (x1 > x2) return this.map[x1][y1].openSides[3] == true && this.map[x2][y2].openSides[1] == true;
            else if (x1 == x2) {
                if (y1 < y2) return this.map[x1][y1].openSides[2] == true && this.map[x2][y2].openSides[0] == true;
                else if (y1 > y2) return this.map[x1][y1].openSides[0] == true && this.map[x2][y2].openSides[2] == true;
            }
        }

        return pos1.x == pos2.x && pos1.y == pos2.y;

    }

    getPositionByCommand(command: Command, pos1: Position) {
        let pos: Position = clonePos(pos1);
        switch (command) {
            case Command.GO_FORWARD:
                switch (pos.dir) {
                    case 0:
                        pos.y--;
                        break;

                    case 1:
                        pos.x++;
                        break;

                    case 2:
                        pos.y++;
                        break;

                    case 3:
                        pos.x--;
                        break;
                }
                break;

            case Command.TURN_LEFT:
                pos.dir = (pos.dir + 3) % 4;
                break;

            case Command.TURN_RIGHT:
                pos.dir = (pos.dir + 1) % 4;
        }

        return pos;
    }

    printDistances() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < this.distances.length; j++) {
                let out: string = "";
                for (let k = 0; k < this.distances[0].length; k++) {
                    out += this.distances[k][j][i];
                    out += " ";
                }
                console.log(out);
            }
            console.log();
        }
    }

    measureDistance(pos1: Position, pos2: Position) {
        this.calculateDistances(pos1);
        return this.distances[pos2.x][pos2.y][pos2.dir];
    }

    getDistance(pos: Position) {
        //calculateDistances(pos1);
        return this.distances[pos.x][pos.y][pos.dir];
    }

    getClosestDestination(startPos: Position, destinations: Position[]): Position {
        let bestDistance: number = 100;
        let bestPos: Position;

        this.calculateDistances(startPos);
        for (let i = 0; i < destinations.length; i++) {
            if (this.getDistance(destinations[i]) < bestDistance && this.getDistance(destinations[i]) != -1) {
                bestDistance = this.getDistance(destinations[i]);
                bestPos = destinations[i];
            }
        }

        return bestPos;
    }

    getPickupPositions(packPos: Position, carriedThings: Position[]) {
        let pickUpPositions: Position[] = [];

        if (this.map[packPos.x][packPos.y].fieldType == 0) {
            if (packPos.armIndex == Arm.LEFT_FRONT_UP || packPos.armIndex == Arm.RIGHT_REAR_UP) {
                if (carriedThings[Arm.LEFT_FRONT_DOWN] == null)
                    return [{x: packPos.x, y: packPos.y, dir: 0, armIndex: Arm.LEFT_FRONT_UP}];
                else if (carriedThings[Arm.RIGHT_REAR_DOWN] == null)
                    return [{x: packPos.x, y: packPos.y, dir: 2, armIndex: Arm.RIGHT_REAR_UP}];
            } else {
                if (carriedThings[Arm.RIGHT_FRONT_DOWN] == null)
                    return [{x: packPos.x, y: packPos.y, dir: 0, armIndex: Arm.RIGHT_FRONT_UP}];
                else if (carriedThings[Arm.LEFT_REAR_DOWN] == null)
                    return [{x: packPos.x, y: packPos.y, dir: 2, armIndex: Arm.LEFT_FRONT_UP}];
            }
            return pickUpPositions;
        }
        if (packPos.dir % 2 == 0) {
            if (carriedThings[Arm.LEFT_FRONT_DOWN] == null)
                pickUpPositions.push({x: packPos.x, y: packPos.y, dir: 0, armIndex: Arm.LEFT_FRONT_UP}, {
                    x: packPos.x - 1,
                    y: packPos.y - 1,
                    dir: 2,
                    armIndex: Arm.LEFT_FRONT_UP
                });
            if (carriedThings[Arm.RIGHT_FRONT_DOWN] == null)
                pickUpPositions.push({x: packPos.x - 1, y: packPos.y, dir: 0, armIndex: Arm.RIGHT_FRONT_UP}, {
                    x: packPos.x,
                    y: packPos.y - 1,
                    dir: 2,
                    armIndex: Arm.RIGHT_FRONT_UP
                });
            if (carriedThings[Arm.RIGHT_REAR_DOWN] == null)
                pickUpPositions.push({x: packPos.x - 1, y: packPos.y - 1, dir: 0, armIndex: Arm.RIGHT_REAR_UP}, {
                    x: packPos.x,
                    y: packPos.y,
                    dir: 2,
                    armIndex: Arm.RIGHT_REAR_UP
                });
            if (carriedThings[Arm.LEFT_REAR_DOWN] == null)
                pickUpPositions.push({x: packPos.x, y: packPos.y - 1, dir: 0, armIndex: Arm.LEFT_REAR_UP}, {
                    x: packPos.x - 1,
                    y: packPos.y,
                    dir: 2,
                    armIndex: Arm.LEFT_REAR_UP
                });


        } else {
            if (carriedThings[Arm.LEFT_FRONT_DOWN] == null)
                pickUpPositions.push({x: packPos.x - 1, y: packPos.y, dir: 1, armIndex: Arm.LEFT_FRONT_UP}, {
                    x: packPos.x,
                    y: packPos.y - 1,
                    dir: 3,
                    armIndex: Arm.LEFT_FRONT_UP
                });
            if (carriedThings[Arm.RIGHT_FRONT_DOWN] == null)
                pickUpPositions.push({x: packPos.x - 1, y: packPos.y - 1, dir: 1, armIndex: Arm.RIGHT_FRONT_UP}, {
                    x: packPos.x,
                    y: packPos.y,
                    dir: 3,
                    armIndex: Arm.RIGHT_FRONT_UP
                });
            if (carriedThings[Arm.RIGHT_REAR_DOWN] == null)
                pickUpPositions.push({x: packPos.x, y: packPos.y - 1, dir: 1, armIndex: Arm.RIGHT_REAR_UP}, {
                    x: packPos.x - 1,
                    y: packPos.y,
                    dir: 3,
                    armIndex: Arm.RIGHT_REAR_UP
                });
            if (carriedThings[Arm.LEFT_REAR_DOWN] == null)
                pickUpPositions.push({x: packPos.x, y: packPos.y, dir: 1, armIndex: Arm.LEFT_REAR_UP}, {
                    x: packPos.x - 1,
                    y: packPos.y - 1,
                    dir: 3,
                    armIndex: Arm.LEFT_REAR_UP
                });


        }

        return pickUpPositions;
    }


    getPutDownPositions(carriedThings: Position[]): Position[] {
        let putDownPositions: Position[] = [];

        for (let i = 0; i < carriedThings.length; i++) {
            if (carriedThings[i] != null) {
                let x: number = carriedThings[i].x;
                let y: number = carriedThings[i].y;
                let dir: number = carriedThings[i].dir;
                if (this.map[x][y].fieldType == 0) {
                    putDownPositions.push({x: x, y: y, dir: (Math.floor(i / 2) * 2 + 2) % 4, armIndex: i});
                    continue;
                }
                switch (i) {
                    case Arm.LEFT_FRONT_DOWN:
                        putDownPositions.push(
                            {x: x, y: y, dir: 0, armIndex: i},
                            {x: x - 1, y: y, dir: 1, armIndex: i},
                            {x: x, y: y - 1, dir: 3, armIndex: i},
                            {x: x - 1, y: y - 1, dir: 2, armIndex: i});
                        break;

                    case Arm.RIGHT_FRONT_DOWN:
                        putDownPositions.push(
                            {x: x, y: y, dir: 3, armIndex: i},
                            {x: x - 1, y: y, dir: 0, armIndex: i},
                            {x: x, y: y - 1, dir: 2, armIndex: i},
                            {x: x - 1, y: y - 1, dir: 1, armIndex: i});
                        break;

                    case Arm.RIGHT_REAR_DOWN:
                        putDownPositions.push(
                            {x: x, y: y, dir: 1, armIndex: i},
                            {x: x - 1, y: y, dir: 2, armIndex: i},
                            {x: x, y: y - 1, dir: 0, armIndex: i},
                            {x: x - 1, y: y - 1, dir: 3, armIndex: i});
                        break;

                    case Arm.LEFT_REAR_DOWN:
                        putDownPositions.push(
                            {x: x, y: y, dir: 2, armIndex: i},
                            {x: x - 1, y: y, dir: 3, armIndex: i},
                            {x: x, y: y - 1, dir: 1, armIndex: i},
                            {x: x - 1, y: y - 1, dir: 0, armIndex: i});
                        break;
                }
            }
        }

        return putDownPositions;

    }

    getArm(putDownPos: Position, carPos: Position): Arm {
        if (carPos.x == putDownPos.x) {
            if (carPos.y == putDownPos.y) {
                switch (carPos.dir) {
                    case 0:
                        return Arm.LEFT_FRONT_DOWN;

                    case 1:
                        return Arm.LEFT_REAR_DOWN;

                    case 2:
                        return Arm.RIGHT_REAR_DOWN;

                    case 3:
                        return Arm.RIGHT_FRONT_DOWN;

                }
            } else {
                switch (carPos.dir) {
                    case 0:
                        return Arm.LEFT_FRONT_DOWN;

                    case 1:
                        return Arm.RIGHT_REAR_DOWN;

                    case 2:
                        return Arm.RIGHT_FRONT_DOWN;

                    case 3:
                        return Arm.LEFT_FRONT_DOWN;

                }
            }
        } else {
            if (carPos.y == putDownPos.y) {
                switch (carPos.dir) {
                    case 0:
                        return Arm.RIGHT_FRONT_DOWN;

                    case 1:
                        return Arm.LEFT_FRONT_DOWN;

                    case 2:
                        return Arm.LEFT_REAR_DOWN;

                    case 3:
                        return Arm.RIGHT_REAR_DOWN;

                }
            } else {
                switch (carPos.dir) {
                    case 0:
                        return Arm.RIGHT_REAR_DOWN;

                    case 1:
                        return Arm.RIGHT_FRONT_DOWN;

                    case 2:
                        return Arm.LEFT_FRONT_DOWN;

                    case 3:
                        return Arm.LEFT_REAR_DOWN;

                }
            }

        }
    }
}

export enum Command {
    TURN_LEFT = 0,
    TURN_RIGHT = 1,
    GO_FORWARD = 2,
    PICK_UP_FRONT_LEFT = 3,
    PICK_UP_FRONT_RIGHT = 4,
    PICK_UP_REAR_LEFT = 5,
    PICK_UP_REAR_RIGHT = 6,
    PUT_DOWN_FRONT_LEFT = 7,
    PUT_DOWN_FRONT_RIGHT = 8,
    PUT_DOWN_REAR_LEFT = 9,
    PUT_DOWN_REAR_RIGHT = 10,

    PICK_UP_FRONT_LEFT_WAREHOUSE = 11,
    PICK_UP_FRONT_RIGHT_WAREHOUSE = 12,
    PICK_UP_REAR_LEFT_WAREHOUSE = 13,
    PICK_UP_REAR_RIGHT_WAREHOUSE = 14,
    PUT_DOWN_FRONT_LEFT_WAREHOUSE = 15,
    PUT_DOWN_FRONT_RIGHT_WAREHOUSE = 16,
    PUT_DOWN_REAR_LEFT_WAREHOUSE = 17,
    PUT_DOWN_REAR_RIGHT_WAREHOUSE = 18
}

function clonePos(pos: Position): Position {
    return {
        x: pos.x,
        y: pos.y,
        dir: pos.dir,
        armIndex: pos.armIndex
    }
}

export const moveCommands: Command[] = [
    Command.GO_FORWARD,
    Command.TURN_LEFT,
    Command.TURN_RIGHT
];

export interface Field {
    openSides: boolean[],
    fieldType: FieldType,

}

export enum FieldType {
    WAREHOUSE = 0,
    ROAD = 1,
    OBSTACLE = 2
}

function arrayMerge(allDestinations: any[], lists: any[][]) {
    lists.forEach(value => {
        value.forEach(value1 => {
            allDestinations.push(value1);
        });
    });
    return allDestinations;
}

interface Position {
    x: number;
    y: number;
    dir: number;
    armIndex: number;
}

export enum Arm {
    LEFT_FRONT_DOWN = 0,
    RIGHT_FRONT_DOWN = 1,
    RIGHT_REAR_DOWN = 2,
    LEFT_REAR_DOWN = 3,

    LEFT_FRONT_UP = 4,
    RIGHT_FRONT_UP = 5,
    RIGHT_REAR_UP = 6,
    LEFT_REAR_UP = 7,
}