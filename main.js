song = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("Model is loaded!!");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video ,0,0,600,500);
fill ("red");
stroke ("red");

if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed: 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed: 1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed: 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed: 2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 450){
        document.getElementById("speed").innerHTML = "Speed: 2.5x";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        leftWristY_num = Number(leftWristY);
        leftWristY_num2 = floor(leftWristY_num);
        volume = leftWristY_num2/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume: " + volume;
    }

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        console.log('The x of left wrist is ' + leftWristX);
        console.log('The y of left wirst is ' + leftWristY);
        console.log('The x of right wrist is ' + rightWristX);
        console.log('The y of right wrist is ' + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist score is " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The right wrist score is " + scoreRightWrist);
    }
}