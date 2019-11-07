package wro2019;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

import java.io.IOException;


/**
 * This file contains an minimal example of a Linear "OpMode". An OpMode is a 'program' that runs in either
 * the autonomous or the teleop period of an FTC match. The names of OpModes appear on the menu
 * of the FTC Driver Station. When an selection is made from the menu, the corresponding OpMode
 * class is instantiated on the Robot Controller and executed.
 * <p>
 * This particular OpMode just executes a basic Tank Drive Teleop for a two wheeled robot
 * It includes all the skeletal structure that all linear OpModes contain.
 * <p>
 * Use Android Studios to Copy this Class, and Paste it into your team's code folder with a new name.
 * Remove or comment out the @Disabled line to add this opmode to the Driver Station OpMode list
 */

@TeleOp(name = "WRO Warehouse", group = "Linear Opmode")

public class MyMain extends LinearOpMode {

    private static String message = "";
    // Declare OpMode members.
    private ElapsedTime runtime = new ElapsedTime();

    static int count = 0;

    private Arm arm;

    static Command command;
    private CommandModel commandModel;

    @Override
    public void runOpMode() {
        telemetry.addData("Status", "Initialized");
        telemetry.update();



        command = null;
        commandModel = new CommandModel();


        // Wait for the game to start (driver presses PLAY)


        Servo armServo = hardwareMap.get(Servo.class, "arm");
        Servo remoteControlServo = hardwareMap.get(Servo.class, "remoteControlServo");
        DcMotor xMoveMotor = hardwareMap.get(DcMotor.class, "xMoveMotor");
        DcMotor yMoveMotor1 = hardwareMap.get(DcMotor.class, "yMoveMotor1");
        DcMotor yMoveMotor2 = hardwareMap.get(DcMotor.class, "yMoveMotor2");
        DcMotor elevatorMotor = hardwareMap.get(DcMotor.class, "elevatorMotor");
        Servo inputServo = hardwareMap.get(Servo.class, "inputServo");

        arm = new Arm(armServo, remoteControlServo, xMoveMotor, yMoveMotor1, yMoveMotor2, elevatorMotor, inputServo);

        waitForStart();
        runtime.reset();


        // run until the end of the match (driver presses STOP)
        while (opModeIsActive()) {
            try {
                command = commandModel.getNewCommand();
            } catch (Exception e) {
                telemetry.addData("error", e.getMessage() + "----" + e.toString());
                telemetry.update();
                sleep(1000);
                continue;
            }

            telemetry.addData("command: " , command.toString());
            if (command != null && command.id != null && command.id > commandModel.lastCommandId) {
                commandModel.lastCommandId = command.id;

                telemetry.addData("topic", command.topic);
                telemetry.addData("message", command.message);
                telemetry.update();

                switch (command.topic) {
                    case "warehouse/inputArrived":
                        telemetry.addData("warehouse cucc", "ok");
                        telemetry.update();
                        sleep(1000);
                        int targetX = Integer.parseInt(command.message.split(" ")[0]);
                        int targetY = Integer.parseInt(command.message.split(" ")[1]);

                        arm.rotateInputServo();
                        arm.remoteControlConveyorBelt();
                        sleep(2500);
                        arm.remoteControlNone();

                        arm.down();
                        arm.close();
                        arm.up();
                        arm.goTo(targetX, targetY);
                        arm.down();
                        arm.open();
                        arm.up();
                        arm.goTo(0, 0);

                        try {
                            commandModel.sendCommand("warehouse/inputFinished",targetX + " " + targetY);
                            telemetry.addData("status", "Warehouse finished");
                        } catch (IOException e) {
                            e.printStackTrace();
                            telemetry.addData("error", e.toString());
                            telemetry.update();
                            sleep(5000);
                        }
                        break;

                    case "warehouse/randomRequest":
                        telemetry.addData("status", "megjoooottt");
                        telemetry.addData("topic", command.topic);
                        telemetry.addData("message", command.message);
                        sleep(10000);
                        break;
                    case "oda":
                        telemetry.addData("csinalodas", "folyamatban");
                        telemetry.update();
                        sleep(3000);
                        try {
                            telemetry.addData("isOk", commandModel.sendCommand("vissza", "4 4"));
                            telemetry.update();
                        } catch (IOException e) {
                            telemetry.addData("errir", e.toString());
                            telemetry.update();
                            sleep(30000);
                        }
                        sleep(2000);
                        break;
                }

                command = null;

            } else {
                telemetry.addData("Status", "waiting for command");
                telemetry.update();

            }

            sleep(100);

        }
    }
}

class Command {
    Integer id;
    String topic;
    String message;

    public Command(Integer id, String topic, String message) {
        this.id = id;
        this.topic = topic;
        this.message = message;
    }

    @Override
    public String toString() {
        return "Command{" +
                "id=" + id +
                ", topic='" + topic + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}