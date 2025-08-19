import "./style.css";

const clockElement = document.querySelector(".clock");
const initialTime = 120;
let timeInterval;
let timeLeft = initialTime;
let activeLetter = 1;
let numberOfLetters = 27;

const channel = new BroadcastChannel("roscopalabra1548");

channel.onmessage = (e) => {
  // console.log("Received message:", e);
  // if (e.data.action === "changeText") {
  //   document.querySelector("#myElement").textContent = e.data.value;
  // }

  if (e.data.action === "play") {
    setActiveLetter(activeLetter);
    startCountdown();
  }

  if (e.data.action === "pasapalabra") {
    setPasapalabra(activeLetter);
    activeLetter++;
    removeActiveLetter();
    stopCountdown();
  }

  if (e.data.action === "correcta") {
    // Handle correcta action
    setCorrecta(activeLetter);
    activeLetter++;
    if (activeLetter > numberOfLetters) {
      activeLetter = 1; // Loop back to the first letter
    }
    setActiveLetter(activeLetter);
  }

  if (e.data.action === "incorrecta") {
    // Handle incorrecta action
    setIncorrecta(activeLetter);
    activeLetter++;
    removeActiveLetter();
    stopCountdown();
  }
};

function setPasapalabra(letterNumber) {
  const pasapalabraLetter = document.querySelector(`.letter-${letterNumber}`);
  if (pasapalabraLetter) {
    pasapalabraLetter.classList.add("pasa");
  }
}

function setCorrecta(letterNumber) {
  const correctaLetter = document.querySelector(`.letter-${letterNumber}`);
  if (correctaLetter) {
    correctaLetter.classList.add("correcta");
  }
}

function setIncorrecta(letterNumber) {
  const incorrectaLetter = document.querySelector(`.letter-${letterNumber}`);
  if (incorrectaLetter) {
    incorrectaLetter.classList.add("incorrecta");
  }
}

function setActiveLetter(letterNumber) {
  const activeLetter = document.querySelector(".letter.active");
  const newActiveLetter = document.querySelector(`.letter-${letterNumber}`);

  if (activeLetter) {
    activeLetter.classList.remove("active");
  }
  if (newActiveLetter) {
    newActiveLetter.classList.add("active");
  }
}

function removeActiveLetter() {
  const activeLetter = document.querySelector(".letter.active");
  if (activeLetter) {
    activeLetter.classList.remove("active");
  }
}

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
