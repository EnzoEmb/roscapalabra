import "./style.css";

const rosca = document.querySelector(".rosca");
console.log(window.obsstudio);
// print on screen window.obsstudio result
if (window.obsstudio) {
  const obs = window.obsstudio;
  // print on document.body, dump the result
  const obsInfo = document.createElement("div");
  obsInfo.textContent = JSON.stringify(obs, null, 2);
  obsInfo.style.whiteSpace = "pre-wrap";
  obsInfo.style.color = "white";
  obsInfo.style.backgroundColor = "black";
  obsInfo.style.padding = "10px";
  obsInfo.style.position = "fixed";
  obsInfo.style.top = "10px";
  obsInfo.style.left = "10px";
  obsInfo.style.zIndex = "1000";
  document.body.appendChild(obsInfo);
}

const channel = new BroadcastChannel("obs-bridge");
channel.onmessage = (e) => {
  if (e.data.action === "changeText") {
    document.querySelector("#myElement").textContent = e.data.value;
  }
};
