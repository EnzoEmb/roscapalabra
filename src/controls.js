const channel = new BroadcastChannel("rosco_rEdKggz6Pyt9eO_");

document.getElementById("play").addEventListener("click", () => {
  channel.postMessage({ action: "play" });
});

document.getElementById("pasapalabra").addEventListener("click", () => {
  channel.postMessage({ action: "pasapalabra" });
});

document.getElementById("correcta").addEventListener("click", () => {
  channel.postMessage({ action: "correcta" });
});

document.getElementById("incorrecta").addEventListener("click", () => {
  channel.postMessage({ action: "incorrecta" });
});
