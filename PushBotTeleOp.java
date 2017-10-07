package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.util.Range;


/**
 * Created by RoydenLynch18 on 10/6/2017.
 */

@TeleOp(name="PushBotTeleOp", group="Linear Opmode")
//@Disabled

public class PushBotTeleOp extends LinearOpMode{

    private ElapsedTime runtime = new ElapsedTime();
    //private Gyroscope imu;
    private DcMotor leftDrive;
    private DcMotor rightDrive; // = null;
    private DcMotor arm; // = null;
    //private DigitalChannel digitalTouch;
    //private DistanceSensor sensorColorRange;
    private Servo leftHand;
    private Servo rightHand;

    @Override
    public void runOpMode(){

        //imu = hardwareMap.get(Gyroscope.class, "imu");
        leftDrive = hardwareMap.get(DcMotor.class, "leftDrive");
        rightDrive = hardwareMap.get(DcMotor.class, "rightDrive");
        arm = hardwareMap.get(DcMotor.class, "arm");
        //digitalTouch = hardwareMap.get(DigitalChannel.class, "digitalTouch");
        //sensorColorRange = hardwareMap.get(DistanceSensor.class, "sensorColorRange");
        leftHand = hardwareMap.get(Servo.class, "leftHand");
        rightHand = hardwareMap.get(Servo.class, "rightHand");

        leftDrive.setDirection(DcMotor.Direction.FORWARD);
        rightDrive.setDirection(DcMotor.Direction.REVERSE);
        //digitalTouch.setMode(DigitalChannel.Mode.INPUT);

        telemetry.addData("Hardware mapped", "Robot initialized.");
        telemetry.update();

        waitForStart();

        runtime.reset();

        while (opModeIsActive()) {
            double leftDrivePower;
            double rightDrivePower;
            double armPower;
            double leftHandPower;
            double rightHandPower;

            double drive = -gamepad1.left_stick_y;
            double turn = gamepad1.right_stick_x;

            leftDrivePower = Range.clip(drive + turn, -1.0, 1.0);
            rightDrivePower = Range.clip(drive - turn, -1.0, 1.0);
            armPower = gamepad2.left_stick_y;
            leftHandPower = gamepad2.right_stick_y;
            rightHandPower = -gamepad2.right_stick_y;

            leftDrive.setPower(leftDrivePower);
            rightDrive.setPower(rightDrivePower);
            arm.setPower(armPower);
            leftHand.setPosition(leftHandPower);
            rightHand.setPosition(rightHandPower);

            telemetry.addData("Status", "Run Time: " + runtime.toString());
            telemetry.addData("Motors", "Left: (%.2f), Right: (%.2f), Arm: (%.2f)", leftDrivePower, rightDrivePower, armPower);
            telemetry.addData("Servos", "Left Hand: (%.2f), Right Hand: (%.2f)", leftHandPower, rightHandPower);
            telemetry.update();





        }

    }










}
