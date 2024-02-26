song = "";
song2 = "";
leftWristY = 0;
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
played = "false";
songIsplaying = "false";
song2Isplaying = "false";

function preload()
{
    song = loadSound('music.mp3');
    song2 = loadSound('npc.mp3')
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 500, 500);
    stroke("Red");
    fill("Red");
    circle(leftWristX, leftWristY, 20);
    circle(rightWristX, rightWristY, 20);
}

function play()
{
    // played = "true";
    if (played=="false")
    {
        played = "true";
        document.getElementById('play_button').innerHTML = "Stop";
    }
    else
    {
        played="false";

        document.getElementById('play_button').innerHTML = "Play";
    }
}

function modelLoaded()
{
    console.log('de')
}

function changesong()
{
    if (leftWristY>rightWristY && songIsplaying == "false")
    {
        song2Isplaying = "false";
        song2.stop()
        song.play()
        songIsplaying = "true";
        document.getElementById('Current_h3').innerHTML="Currently Playing - Exciting Music";
    }
    if (rightWristY>leftWristY && song2Isplaying == "false")
    {
        songIsplaying = "false";
        song.stop()
        song2.play()
        song2Isplaying = "true";
        document.getElementById('Current_h3').innerHTML="Currently Playing - Npc Music"
    }
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x-140;
        rightWristX = results[0].pose.rightWrist.x-30;
        console.log("Y of left wrist is " + leftWristY + " and Y of right wrist is " + rightWristY + " and the X of left wrist is "+leftWristX+" finally the X of right wrist is "+rightWristX);
        // changesong()
        if (played == "true")
        {
            changesong();
        }
        else
        {
            song2.stop();
            song.stop();
            document.getElementById('Current_h3').innerHTML="Currently Playing - Nil"
        }
    }
}