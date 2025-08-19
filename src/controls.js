const broadcast_id = "roscopalabra1548";

const channel = new BroadcastChannel("roscopalabra1548");

// document.getElementById("btn").addEventListener("click", () => {
//   channel.postMessage({ action: "changeText", value: "Hello from Dock" });
// });

document.getElementById("play").addEventListener("click", () => {
  channel.postMessage({ action: "play" });
});

document.getElementById("pasapalabra").addEventListener("click", () => {
  channel.postMessage({ action: "pasapalabra" });
});
