package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;

public class Arm {
    Servo remoteControlServo;
    Servo armServo;
    DcMotor xMoveMotor;
    DcMotor yMoveMotor1;
    DcMotor yMoveMotor2;
    DcMotor elevatorMotor;


    int xMax = 960;
    int yMax = 980;

    int elevatorMax = 240;

    public Arm(Servo armServo, Servo remoteControlServo, DcMotor xMoveMotor, DcMotor yMoveMotor1, DcMotor yMoveMotor2, DcMotor elevatorMotor) {
        this.armServo = armServo;
        this.xMoveMotor = xMoveMotor;
        this.yMoveMotor1 = yMoveMotor1;
        this.yMoveMotor2 = yMoveMotor2;
        this.elevatorMotor = elevatorMotor;
        this.remoteControlServo = remoteControlServo;
        init();
    }

    public void init() {
        this.up();
        this.open();


        this.xMoveMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        this.xMoveMotor.setTargetPosition(0);
        this.xMoveMotor.setPower(0.8);

        this.yMoveMotor1.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        this.yMoveMotor1.setTargetPosition(0);
        this.yMoveMotor1.setPower(0.8);

        this.yMoveMotor2.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        this.yMoveMotor2.setTargetPosition(0);
        this.yMoveMotor2.setPower(0.8);

        this.elevatorMotor.setMode(DcMotor.RunMode.RUN_TO_POSITION);
        this.elevatorMotor.setTargetPosition(0);
        this.elevatorMotor.setPower(0.6);
    }

    public void up(boolean async) {
        elevatorMotor.setTargetPosition(0);
        if (!async) {
            while (elevatorMotor.isBusy()) {
                // Do nothing
            }
        }
    }

    public void up() {
        up(false);
    }

    public void down(boolean async) {
        elevatorMotor.setTargetPosition(elevatorMax);
        if (!async) {
            while (elevatorMotor.isBusy()) {
                // Do nothing
            }
        }
    }

    public void down() {
        down(false);
    }


    public void remoteControlNone() {
        remoteControlServo.setPosition(0.5);
    }

    public void remoteControlConveyorBelt() {
        remoteControlServo.setPosition(1);
    }

    public void remoteControlSwipe() {
        remoteControlServo.setPosition(0);
    }

    public void open() {
        open(true);
    }

    public void open(boolean waitForOpen) {
        armServo.setPosition(0);

        if (waitForOpen) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }


    }

    public void close() {
        close(true);
    }

    public void close(boolean waitForClose) {
        armServo.setPosition(1);

        if (waitForClose) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        armServo.setPosition(1);

    }

    public void goTo(int x, int y) {
        goTo(x, y, false);
        sleep(200);
    }

    private void sleep(int millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void goTo(int x, int y, boolean async) {
        goToX(x, true);
        goToY(y, true);
        if (!async) {
            while (xMoveMotor.isBusy() || yMoveMotor2.isBusy() || yMoveMotor1.isBusy()) {
                // Do nothing
            }
        }
        sleep(200);

    }

    public void goToX(int x, boolean async) {
        int unitX = xMax / 4;
        xMoveMotor.setPower(0.8);
        xMoveMotor.setTargetPosition(x * unitX);
        if (!async) {
            while (xMoveMotor.isBusy()) {
                // Do nothing :\
            }
        }
        sleep(200);

    }

    public void goToX(int x) {
        goToX(x, false);
    }

    public void goToY(int y, boolean async) {
        int unitY = yMax / 4;
        // The arm moves by 2 motors on the y axis
        yMoveMotor1.setPower(0.8);
        yMoveMotor2.setPower(0.8);

        yMoveMotor1.setTargetPosition(-y * unitY);
        yMoveMotor2.setTargetPosition(y * unitY);
        if (!async) {
            while (yMoveMotor2.isBusy() || yMoveMotor1.isBusy()) {
                // Do nothing :(
            }
        }
        sleep(200);

    }

    public void goToY(int y) {
        goToY(y, false);
    }
}