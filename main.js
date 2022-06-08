faded = " "
invicible = " "

leftWristX = 0
leftWristY = 0

rightWristX = 0
rightWristY = 0

scoreLeftWrist = 0
scoreRightWrist = 0

faded_status = " "
invicible_status = " "

function preload() {
    faded = loadSound("Faded.mp3")
    invicible = loadSound("Invicible.mp3")
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()

    video = createCapture(VIDEO)
    video.size(500, 500)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function draw() {
    image(video, 0, 0, 500, 500)
    fill("yellow")
    stroke("red")

    faded_status = faded.isPlaying()
    invicible_status = invicible.isPlaying()

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 30)
        invicible.stop()

        if (faded_status == false) {
            faded.play()
            document.getElementById("status").innerHTML = "playing - Faded"
        }
    }

    if( scoreRightWrist >= 0.2)
    {
        circle(rightWristX,rightWristY,30)
        faded.stop()

        if(invicible_status == false)
        {
            invicible.play()
            document.getElementById("status").innerHTML = "playing - Invicible"
        }
    }

}

function modelLoaded() {
    console.log("Posenet is intialized")
}

function gotPoses(results) {
    if (results > 0) {
        console.log(results)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y

        scoreLeftWrist = results[0].pose.keypoints[9].score

        scoreRightWrist = results[0].pose.keypoints[10].score
    }
}