import { audio } from "./audio.js";

export const button = {
    play: document.querySelector("#play-button"),
    stop: document.querySelector("#stop-button"),
};
export const track_control = document.querySelector("input[type=range]");

track_control.onchange = e=> {
    audio.currentTime = e.target.value / 100 * audio.duration;
}

button.play.onclick = ()=> {
    audio.play();
}
button.stop.onclick = ()=> {
    audio.pause();
}