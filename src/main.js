import "./style.css";

const soundClock = new Audio("/sfx/clock-ticking.mp3");
const soundCorrect = new Audio("/sfx/correct.mp3");
const soundIncorrect = new Audio("/sfx/wrong.mp3");
const soundSkip = new Audio("/sfx/skip.mp3");

const clockElement = document.querySelector(".clock");
const initialTime = 120;
let timeInterval;
let timeLeft = initialTime;
let activeLetter = 1;
let numberOfLetters = 27;
let isFirstRound = true;
let isLastWord = false;
let isGameFinished = false;

const params = new URLSearchParams(window.location.search);
const instance_name = "rosco_rEdKggz6Pyt9eO_" + params.get("instance");

const channel = new BroadcastChannel(instance_name);

channel.onmessage = (e) => {
  if (e.data.action === "resetear") {
    console.log("RESET");
    stopCountdown();
    document.querySelectorAll(".letter").forEach((e) => {
      e.classList.remove("correcta", "incorrecta", "pasa", "active");
    });
    setTimeout(() => {
      timeLeft = initialTime;
      activeLetter = 1;
      numberOfLetters = 27;
      isFirstRound = true;
      isLastWord = false;
      isGameFinished = false;
    }, 50);
  }

  if (e.data.action === "play") {
    setActiveLetter(activeLetter);
    startCountdown();
  }

  if (e.data.action === "pasapalabra") {
    setPasapalabra(activeLetter);
    sumActiveLetter();
    removeActiveLetter();
    stopCountdown();
  }

  if (e.data.action === "correcta") {
    // Handle correcta action
    setCorrecta(activeLetter);
    sumActiveLetter();

    setActiveLetter(activeLetter);
  }

  if (e.data.action === "incorrecta") {
    // Handle incorrecta action
    setIncorrecta(activeLetter);
    sumActiveLetter();
    removeActiveLetter();
    stopCountdown();
  }
  if (e.data.action === "time-change") {
    timeLeft = e.data.value;
    clockElement.textContent = timeLeft;
  }
};

function setPasapalabra(letterNumber) {
  const pasapalabraLetter = document.querySelector(`.letter-${letterNumber}`);
  if (pasapalabraLetter) {
    cleanLetterClasses(letterNumber);
    pasapalabraLetter.classList.add("pasa");
    // soundSkip.currentTime = 0;
    // soundSkip.play();
  }
}

function setCorrecta(letterNumber) {
  const correctaLetter = document.querySelector(`.letter-${letterNumber}`);
  if (correctaLetter) {
    cleanLetterClasses(letterNumber);
    correctaLetter.classList.add("correcta");
    // soundCorrect.currentTime = 0;
    // soundCorrect.play();
    // if (isLastWord) {
    //   console.log("ACERTO LA ULTIMA PALABRA");
    //   setTimeout(() => {
    //     correctaLetter.classList.remove("active");
    //   }, 100);
    // }
  }
}

function setIncorrecta(letterNumber) {
  const incorrectaLetter = document.querySelector(`.letter-${letterNumber}`);
  if (incorrectaLetter) {
    cleanLetterClasses(letterNumber);
    incorrectaLetter.classList.add("incorrecta");
    // soundIncorrect.currentTime = 0;
    // soundIncorrect.play();
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

function sumActiveLetter() {
  // console.log("sumActiveLetter", activeLetter);
  // console.log("isFirstRound", isFirstRound);
  if (isFirstRound) {
    activeLetter++;

    if (activeLetter > numberOfLetters) {
      isFirstRound = false;

      // clean pasapalabra letters
      let pasapalabra_letters = document.querySelectorAll(".letter.pasa");
      pasapalabra_letters.forEach((letter) => {
        letter.classList.remove("pasa");
      });

      sumActiveLetter();
    }
  }

  if (!isFirstRound) {
    // set active letter to the closest without classes
    const nextFreeLetter = document.querySelector(".letter:not(.correcta):not(.incorrecta)");

    if (nextFreeLetter) {
      activeLetter = nextFreeLetter.dataset.index;
    } else {
      isLastWord = true;
      isGameFinished = true;
      // is last letter, remove class active
      setTimeout(() => {
        removeActiveLetter();
        stopCountdown();
        // setCorrecta( activeLetter);
        console.log("No more letters available");
      }, 50);
    }

    // setActiveLetter(nextFreeLetter.dataset.index);
  }
}

function cleanLetterClasses(letterNumber) {
  const letter = document.querySelector(`.letter-${letterNumber}`);
  if (letter) {
    letter.classList.remove("correcta", "incorrecta", "pasa");
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
  clockElement.classList.add("active");

  // check that countdown is not playing
  // if (timeInterval) {
  //   return;
  // }

  timeInterval = setInterval(() => {
    console.log("tick");
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      // clockElement.textContent = "Time's up!";
    } else {
      clockElement.textContent = timeLeft;
      timeLeft--;
    }
    channel.postMessage({ action: "time_tick", value: timeLeft });
  }, 1000);

  // soundClock.currentTime = 0;
  // soundClock.play();
}

function stopCountdown() {
  console.log("Countdown stopped");
  clockElement.classList.remove("active");

  clearInterval(timeInterval);
  // soundClock.pause();
}
