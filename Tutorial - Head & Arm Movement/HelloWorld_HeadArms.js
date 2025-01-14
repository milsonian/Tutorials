/*
*    Copyright 2019 Misty Robotics, Inc.
*    Licensed under the Apache License, Version 2.0 (the "License");
*    you may not use this file except in compliance with the License.
*    You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*    Unless required by applicable law or agreed to in writing, software
*    distributed under the License is distributed on an "AS IS" BA SIS,
*    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
implied.
*    See the License for the specific language governing permissions and
*    limitations under the License.
*/

// debug message to indicate the skill has started
misty.Debug("starting skill HelloWorld_HeadArms");

// register for front TOF and add property tests
misty.AddPropertyTest("FrontTOF", "SensorPosition", "!==", "Back", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double");
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 100);

// front TOF callback, head
function _FrontTOF(data) {
    misty.Debug(data);
    misty.ChangeLED(0, 255, 255); // aqua
    misty.PlayAudio("s_Awe.wav");

    // pitch
    misty.MoveHeadPosition(-5, 0, 0, 60, 0, 1500); // pitch up
    misty.MoveHeadPosition(5, 0, 0, 60, 0, 1500); // pitch down
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // pitch center

    misty.ChangeLED(255, 0, 255); // magenta
    misty.PlayAudio("s_Awe2.wav");

    // yaw
    misty.MoveHeadPosition(0, 0, -5, 60, 0, 1500); // yaw left
    misty.MoveHeadPosition(0, 0, 5, 60, 0, 1500); // yaw right
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // yaw center

    misty.ChangeLED(255, 255, 0); // yellow
    misty.PlayAudio("s_Awe3.wav");

    // roll
    misty.MoveHeadPosition(0, -5, 0, 60, 0, 1500); // roll left
    misty.MoveHeadPosition(0, 5, 0, 60, 0, 1500); // roll right
    misty.MoveHeadPosition(0, 0, 0, 60, 0, 1500); // roll center

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudio("s_DisorientedConfused.wav");

    // register for back TOF and add property tests
    misty.AddPropertyTest("BackTOF", "SensorPosition", "==", "Back", "string");
    misty.AddPropertyTest("BackTOF", "DistanceInMeters", "<=", 0.2, "double");
    misty.RegisterEvent("BackTOF", "TimeOfFlight", 100);
}

// back TOF callback, arms
function _BackTOF() {
    misty.ChangeLED(0, 255, 0) // lime
    misty.PlayAudio("s_Joy.wav");

    // left
    misty.MoveArmPosition("Left", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Left", 2, 60, 0, 1500); // down

    misty.ChangeLED(128, 0, 0) // maroon
    misty.PlayAudio("s_Joy2.wav");

    // right
    misty.MoveArmPosition("Right", 10, 60, 0, 1500); // up
    misty.MoveArmPosition("Right", 2, 60, 0, 1500); // down

    misty.ChangeLED(0, 0, 0); // off
    misty.PlayAudio("s_Joy3.wav");

    misty.Debug("ending skill HelloWorld_HeadArms");
}