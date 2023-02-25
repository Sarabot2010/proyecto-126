cancion = "";
cancion2 = "";
cancion_estatus1 = "";
cancion_estatus2 = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
function preload() {
    cancion = loadSound("A dónde vamos.mp3");
    cancion2 = loadSound("What makes you beautiful.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet se inicializo");
}

function draw() {
    image(video, 0, 0, 600, 500);
    cancion_estatus1 = cancion.isPlaying();
    cancion_estatus2 = cancion2.isPlaying();
    fill("#EBF058")
    stroke("#EBF058")
    if(scoreRightWrist>0.2) {
        circle(rightX, rightY, 20);
        cancion2.stop();
        if(cancion_estatus1==false) {
            cancion.play()
            document.getElementById("song").innerHTML = "Reproduciendo: A dónde vamos";
        }
    }
    if(scoreLeftWrist>0.2) {
        circle(rightX, rightY, 20);
        cancion2.stop();
        if(cancion_estatus2==false) {
            cancion2.play()
            document.getElementById("song").innerHTML = "Reproduciendo: What makes you beautiful";
        }
    }
}

function play() {
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("leftX= "+leftX+ "leftY= "+leftY);
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("rightX= "+rightX+ "rightY= "+right1);
    }
}