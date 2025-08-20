const channel = new BroadcastChannel("rosco_rEdKggz6Pyt9eO_");

const btn_play = document.getElementById("play");
const btn_pasapalabra = document.getElementById("pasapalabra");
const btn_correcta = document.getElementById("correcta");
const btn_incorrecta = document.getElementById("incorrecta");
const time_left = document.getElementById("time_left");

btn_play.addEventListener("click", () => {
  channel.postMessage({ action: "play" });
  btn_play.disabled = true;
  btn_pasapalabra.disabled = false;
  btn_correcta.disabled = false;
  btn_incorrecta.disabled = false;
});

btn_pasapalabra.addEventListener("click", () => {
  channel.postMessage({ action: "pasapalabra" });
  btn_play.disabled = false;
  btn_pasapalabra.disabled = true;
  btn_correcta.disabled = true;
  btn_incorrecta.disabled = true;
});

btn_correcta.addEventListener("click", () => {
  channel.postMessage({ action: "correcta" });
});

btn_incorrecta.addEventListener("click", () => {
  channel.postMessage({ action: "incorrecta" });
  btn_play.disabled = false;
  btn_pasapalabra.disabled = true;
  btn_correcta.disabled = true;
  btn_incorrecta.disabled = true;
});

time_left.addEventListener("change", () => {
  console.log(time_left.value);
  console.log("triggered change");
  channel.postMessage({ action: "time-change", value: time_left.value });
});

// recive msgs
channel.onmessage = (e) => {
  if (e.data.action === "time_tick") {
    console.log(e.data.value);
    time_left.value = e.data.value;
  }
};
