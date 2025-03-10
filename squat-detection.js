// Load MediaPipe Pose library (ensure this script is loaded before your custom script)
const video = document.createElement("video");

// Initialize MediaPipe Pose
const pose = new mp.pose.Pose({
  solutionOptions: { selfieMode: true, modelComplexity: 1 },
});

// Create a function to analyze pose data and detect squat
function detectSquat(landmarks) {
  const leftKnee = landmarks[mp.pose.PoseLandmark.LEFT_KNEE];
  const rightKnee = landmarks[mp.pose.PoseLandmark.RIGHT_KNEE];
  const leftHip = landmarks[mp.pose.PoseLandmark.LEFT_HIP];
  const rightHip = landmarks[mp.pose.PoseLandmark.RIGHT_HIP];

  const angleLeftLeg = calculateAngle(leftHip, leftKnee);
  const angleRightLeg = calculateAngle(rightHip, rightKnee);

  const squatThreshold = 90;
  if (angleLeftLeg < squatThreshold && angleRightLeg < squatThreshold) {
    console.log('Squat detected!');
  }
}

function calculateAngle(point1, point2) {
  const deltaY = point2.y - point1.y;
  const deltaX = point2.x - point1.x;
  return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

async function startPoseDetection() {
  const videoElement = document.getElementById("video");

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoElement.srcObject = stream;
  videoElement.play();

  const webcamElement = document.getElementById("webcam");
  pose.onResults(onResults);

  function onResults(results) {
    if (results.poseLandmarks) {
      detectSquat(results.poseLandmarks);
    }
  }
}

startPoseDetection();
