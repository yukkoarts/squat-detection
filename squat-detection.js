let squatCount = 0;
let isSquatting = false;
let squatStartTime = null;
let feedbackGiven = false;

function getKneeAngle() {
  // Replace with actual logic to get knee angle based on camera feed or device sensors.
  return Math.random() * 180; // Simulating knee angle between 0 and 180
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

function checkSquat() {
  const kneeAngle = getKneeAngle();
  const feedbackElement = document.getElementById('feedback');

  if (kneeAngle < 150) {
    if (!isSquatting) {
      isSquatting = true;
      squatStartTime = Date.now();
      feedbackGiven = false;
      feedbackElement.textContent = "Squat detected! Hold for 1 sec";
    } else if (Date.now() - squatStartTime >= 1000) {
      if (kneeAngle >= 80 && kneeAngle <= 100) {
        feedbackElement.textContent = `Good squat! Count: ${squatCount + 1}`;
        speakText("Good squat!");
        squatCount++;
      } else if (kneeAngle > 100 && !feedbackGiven) {
        feedbackElement.textContent = "Go lower!";
        speakText("Go lower.");
        feedbackGiven = true;
      } else if (kneeAngle < 80 && !feedbackGiven) {
        feedbackElement.textContent = "Too low, raise up a bit!";
        speakText("Too low, raise up a bit.");
        feedbackGiven = true;
      }
    }
  } else if (isSquatting && kneeAngle > 150) {
    isSquatting = false;
    squatStartTime = null;
    feedbackElement.textContent = "Stand up to complete rep!";
  }
}

setInterval(checkSquat, 100);
