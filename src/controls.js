import slugify from "slugify";
import "./controls.css";

const params = new URLSearchParams(window.location.search);
const default_instance_name = "rosco_rEdKggz6Pyt9eO_" + params.get("instance");

const main_container = document.querySelector("#controls");

// settings
const checkbox_sound = document.querySelector("#enable_sound");

function initInstance(instance_name) {
  const channel = new BroadcastChannel(instance_name);
  const instance_container = document.querySelector(`.instance[data-id="${instance_name}"]`);

  const btn_play = instance_container.querySelector(".btn_play");
  const btn_pasapalabra = instance_container.querySelector(".btn_pasapalabra");
  const btn_correcta = instance_container.querySelector(".btn_correcta");
  const btn_incorrecta = instance_container.querySelector(".btn_incorrecta");
  const btn_resetear = instance_container.querySelector(".btn_reset");
  const time_left = instance_container.querySelector(".btn_time_left");

  const btn_animate_in = instance_container.querySelector(".btn_animate_in");
  const btn_animate_out = instance_container.querySelector(".btn_animate_out");

  btn_animate_in.addEventListener("click", () => {
    channel.postMessage({ action: "animate-in" });
  });

  btn_animate_out.addEventListener("click", () => {
    channel.postMessage({ action: "animate-out" });
  });

  checkbox_sound.addEventListener("change", () => {
    channel.postMessage({ action: "sound", value: checkbox_sound.checked });
  });

  btn_resetear.addEventListener("click", () => {
    channel.postMessage({ action: "resetear" });
    btn_play.disabled = false;
    btn_pasapalabra.disabled = true;
    btn_correcta.disabled = true;
    btn_incorrecta.disabled = true;
    time_left.value = 120;
  });

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
}

// init default instance
initInstance(default_instance_name);

// add new instance
const btn_new_instance = document.querySelector(".btn_add-instance");
btn_new_instance.addEventListener("click", function () {
  const name = prompt("Ingresa el nombre de la nueva instancia");
  let instance_name = "rosco_rEdKggz6Pyt9eO_" + slugify(name, { lower: true });

  if (name !== null) {
    main_container.insertAdjacentHTML(
      "beforeend",
      `
    <div class="instance" data-id="${instance_name}">
      <div class="header">Rosco ${name}</div>
      <div class="top">
        <button type="button" class="btn_play" class="w-full">PLAY</button>
      </div>
      <div class="bottom">
        <button disabled type="button" class="btn_correcta">CORRECTA</button>
        <button disabled type="button" class="btn_incorrecta">INCORRECTA</button>
        <button disabled type="button" class="btn_pasapalabra">PASAPALABRA</button>
      </div>
      <div class="minititle">Tiempo restante</div>
      <input type="number" class="btn_time_left" value="120" min="1" max="999" />
      <button type="button" class="btn_reset">RESETEAR ROSCO</button>
    </div>
    `
    );
  }
  initInstance(instance_name);
});
