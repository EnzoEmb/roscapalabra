const channel = new BroadcastChannel("obs-bridge");
document.getElementById("btn").addEventListener("click", () => {
  channel.postMessage({ action: "changeText", value: "Hello from Dock" });
});
