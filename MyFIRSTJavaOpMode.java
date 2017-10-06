package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DigitalChannel;
import com.qualcomm.robotcore.hardware.DistanceSensor;
import com.qualcomm.robotcore.hardware.Gyroscope;
import com.qualcomm.robotcore.hardware.Servo;

import org.firstinspires.ftc.robotcore.external.navigation.DistanceUnit;

/**
 * Created by RoydenLynch18 on 10/3/2017.
 */

@TeleOp
public class MyFIRSTJavaOpMode extends LinearOpMode {
    private Gyroscope imu;
    private DcMotor motorTest;
    private DigitalChannel digitalTouch;
    private DistanceSensor sensorColorRange;
    private Servo servoTest;
    @Override
    public void runOpMode() {
        imu = hardwareMap.get(Gyroscope.class, "imu");
        motorTest = hardwareMap.get(DcMotor.class, "motorTest");
        digitalTouch = hardwareMap.get(DigitalChannel.class, "digitalTouch");
        sensorColorRange = hardwareMap.get(DistanceSensor.class, "sensorColorRange");
        servoTest = hardwareMap.get(Servo.class, "servoTest");
        telemetry.addData("Status", "Initialized");
        telemetry.update();
        // Wait for the game to start (driver presses PLAY)

        // set digital channel to input mode.
        digitalTouch.setMode(DigitalChannel.Mode.INPUT);
        telemetry.addData("Status", "Initialized");
        telemetry.update();

        waitForStart();
        // run until the end of the match (driver presses STOP)
        while (opModeIsActive()) {
            telemetry.addData("Status", "Running");
            telemetry.update();

            // run until the end of the match (driver presses STOP)
            double tgtPowerMotor = 0;
            double tgtPowerServo = 0;
            while (opModeIsActive()) {

                tgtPowerMotor = -this.gamepad1.left_stick_y;
                motorTest.setPower(tgtPowerMotor);
                telemetry.addData("Target Power", tgtPowerMotor);
                telemetry.addData("Motor Power", motorTest.getPower());
                telemetry.addData("Status", "Running");
                telemetry.update();


                tgtPowerServo = -this.gamepad1.left_stick_y;
                motorTest.setPower(tgtPowerServo);
                // check to see if we need to move the servo.
                if(gamepad1.y) {
                    // move to 0 degrees.
                    servoTest.setPosition(0);
                } else if (gamepad1.x || gamepad1.b) {
                    // move to 90 degrees.
                    servoTest.setPosition(0.5);
                } else if (gamepad1.a) {
                    // move to 180 degrees.
                    servoTest.setPosition(1);
                }
                telemetry.addData("Servo Position", servoTest.getPosition());
                telemetry.addData("Target Power", tgtPowerServo);
                telemetry.addData("Motor Power", motorTest.getPower());
                telemetry.addData("Status", "Running");
                telemetry.update();


                telemetry.addData("Servo Position", servoTest.getPosition());
                telemetry.addData("Target Power", tgtPowerMotor);
                telemetry.addData("Motor Power", motorTest.getPower());
                telemetry.addData("Distance (cm)", sensorColorRange.getDistance(DistanceUnit.CM));
                telemetry.addData("Status", "Running");
                telemetry.update();

                // is button pressed?
                if (digitalTouch.getState() == false) {
                    // button is pressed.
                    telemetry.addData("Button", "PRESSED");
                } else {
                    // button is not pressed.
                    telemetry.addData("Button", "NOT PRESSED");
                }
                telemetry.addData("Status", "Running");
                telemetry.update();




            }



        }
    }
}
