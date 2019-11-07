import brickpi from "brickpi-raspberry";

var robot = new brickpi.Robot();
var motorA = new brickpi.Motor({port: brickpi.MOTOR.A, name: 'Upper arm'});


robot.setup().addMotor(motorA)

motorA.start(-100).stopIn(720, function(err: any) {
    // callback called when motor has reached end point
});