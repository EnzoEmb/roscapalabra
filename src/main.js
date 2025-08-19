import "./style.css";

const clockElement = document.querySelector(".clock");
const initialTime = 120;
let timeInterval,
  timeLeft = initialTime;

const channel = new BroadcastChannel("roscopalabra1548");

channel.onmessage = (e) => {
  // console.log("Received message:", e);
  // if (e.data.action === "changeText") {
  //   document.querySelector("#myElement").textContent = e.data.value;
  // }

  if (e.data.action === "play") {
    startCountdown();
  }
  if (e.data.action === "pasapalabra") {
    stopCountdown();
  }
};

function startCountdown() {
  console.log("Countdown started");

  timeInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      clockElement.textContent = "Time's up!";
    } else {
      clockElement.textContent = timeLeft;
      timeLeft--;
    }
  }, 1000);
}

function stopCountdown() {
  console.log("Countdown stopped");
  clearInterval(timeInterval);
}
