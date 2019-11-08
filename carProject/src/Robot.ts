import {SensorArray} from "./SensorArray";
import {Chassis} from "./Chassis";
import {Command, Commander, Position} from "./Commander";
import {Lifter} from "./Lifter";
import {Observable} from "rxjs";
import axios, {AxiosStatic} from "axios";
import {Thing} from "./Thing";

const brickpi3 = require('brickpi3');
let BP = new brickpi3.BrickPi3();

brickpi3.utils.resetAllWhenFinished(BP);


const map = [[{"fieldType": 1, "openSides": [false, true, true, false]}, {
    "fieldType": 1,
    "openSides": [true, false, true, false]
}, {"fieldType": 1, "openSides": [true, true, true, false]}, {
    "fieldType": 1,
    "openSides": [true, false, true, false]
}, {"fieldType": 1, "openSides": [true, true, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 0, "openSides": [false, true, false, true]}], [{
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}], [{"fieldType": 1, "openSides": [false, true, false, true]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 1, "openSides": [false, true, false, true]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 1, "openSides": [false, true, true, true]}, {
    "fieldType": 1,
    "openSides": [true, false, true, false]
}, {"fieldType": 1, "openSides": [true, true, false, true]}], [{
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 1,
    "openSides": [false, true, false, true]
}], [{"fieldType": 1, "openSides": [false, false, true, true]}, {
    "fieldType": 1,
    "openSides": [true, false, true, false]
}, {"fieldType": 1, "openSides": [true, false, true, true]}, {
    "fieldType": 1,
    "openSides": [true, false, true, false]
}, {"fieldType": 1, "openSides": [true, false, false, true]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 1, "openSides": [false, true, false, true]}], [{
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}], [{"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}, {
    "fieldType": 2,
    "openSides": [false, false, false, false]
}, {"fieldType": 2, "openSides": [false, false, false, false]}]];

interface MQTTMessage {
    topic: string;
    message: string;
}

export class Robot {
    static sensorArray: SensorArray;
    static chassis: Chassis;
    static commander: Commander;
    static lifter: Lifter;

    static client: any;
    static BP: any;

    static MQTT: Observable<MQTTMessage>;
    static HTTP: AxiosStatic;
    static serverIP: string;

    static inArmThings: Thing[];

    static async onInit() {
        Robot.BP = brickpi3;
        Robot.HTTP = axios;

        Robot.inArmThings = [null, null, null, null];

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
        Robot.commander = new Commander(map);
        Robot.lifter = new Lifter(motorA, motorD);

        console.log("Initializing sensor array...");
        await Robot.sleep(3000);


        await this.commander.execute([
            Command.GO_FORWARD,
            Command.GO_FORWARD,
            Command.TURN_RIGHT,
            Command.PUT_DOWN_REAR_LEFT_WAREHOUSE,
        ]);
        await this.lifter.resetGearShiftMotor();

        await Robot.sleep(1000000);

        let isInfiniteRunning = true;
        while (isInfiniteRunning) {


            await new Promise((resolve) => {
                this.HTTP.get("http://" + Robot.serverIP + "/car/get_orders")
                    .then(response => {

                        let things: Thing[] = Thing.parseData(response.data);

                        //console.log(things);

                        //adatbázis lekérés
                        let packageList: Position[] = [];
                        things.forEach((thing: Thing) => {
                            if (thing.status === "SUPPLIER") {
                                packageList.push({
                                    x: thing.start_x,
                                    y: thing.start_y,
                                    dir: thing.start_dir,
                                    armIndex: null
                                });
                            }

                            if (thing.status === "WAREHOUSE" && thing.isOrdered()) {
                                packageList.push({
                                    x: 0,
                                    y: 6,
                                    dir: 0,
                                    armIndex: Commander.getWHOutputPos(this.inArmThings)
                                });
                            }

                            if (thing.status === "DELIVERING") {
                                if (thing.dest_x == -1) {

                                    let armIndex = this.inArmThings.findIndex((testThing: Thing) => {
                                        return testThing && thing.id === testThing.id;
                                    });
                                    if(armIndex < 0) console.log("negatív kar");
                                    packageList.push({
                                        x: 0,
                                        y: 6,
                                        dir: 0,
                                        armIndex
                                    });
                                } else {
                                    packageList.push({x: thing.dest_x, y: thing.dest_y, dir: 0, armIndex: null});
                                }
                            }
                        });

                        console.log(packageList);




                        //TODO utat számolni, parancslistát végrehajtani
                        //this.commander.execute


                        //TODO adatbázist frissíteni (delivering --> warehouse/delivered, supplier/warehouse --> delivering)


                        resolve();
                    })
                    .catch((e) => {
                        console.log("NETWORK ERROR: " + e);
                        resolve();
                    });

            });

            console.log("ciklus vége");


            await this.sleep(2000);

            //isInfiniteRunning = false;
        }

        /*  await this.commander.execute([
              Command.GO_FORWARD,
              Command.WAREHOUSE_PUT_DOWN,
          ]);*/


        /*let plan = Robot.commander.getPlan(
             {x: 3, y: 4, dir: 1, armIndex: null},
             [{x: 1, y: 1, dir: 1, armIndex: null}],
             [null, {x: 0, y: 6, dir: 0, armIndex: 1}, null, null]
         );
         let commandList = plan.commandList;

         console.log(commandList);*/


        /*await this.commander.execute([
           Command.GO_FORWARD,
           Command.GO_FORWARD,
           Command.GO_FORWARD,
           Command.TURN_LEFT,
           Command.PUT_DOWN_FRONT_RIGHT_WAREHOUSE,
           Command.PUT_DOWN_FRONT_LEFT_WAREHOUSE,
        ]);*/


        //await this.commander.execute(commandList);




        // await this.sleep(100000);
        while (true) {
            await this.commander.execute([
                //    3, 4, 5, 6, 7, 8, 9, 10,

                //Command.PUT_DOWN_FRONT_LEFT_WAREHOUSE
                /*Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.PICK_UP_REAR_RIGHT*/
                Command.GO_FORWARD,
                Command.PICK_UP_FRONT_RIGHT,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_LEFT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_LEFT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_RIGHT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_LEFT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_LEFT,
                Command.GO_FORWARD,
                Command.GO_FORWARD,
                Command.TURN_LEFT,
                Command.TURN_LEFT,
            ]);

        }

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

    static async waitCommand(topic: string): Promise<MQTTMessage> {
        return new Promise(resolve => {
            let subscription = this.MQTT.subscribe(mqttMessage => {
                if (mqttMessage.topic.indexOf(topic) != -1) {
                    subscription.unsubscribe();
                    resolve(mqttMessage);
                }
            });
        });
    }
}