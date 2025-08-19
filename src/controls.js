const broadcast_id = "roscopalabra1548";
const channel = new BroadcastChannel("roscopalabra1548");

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
