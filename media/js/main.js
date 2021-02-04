import { ctx, render } from "./renderer.js";
import { button, track_control } from "./pad.js";
import { prep, analyser, audio } from "./audio.js";

let played = false;
let control_pressed = false;
let radius = 80;
let track = null;

loop();
button.play.addEventListener("click", ()=> {
    if (played) return;
    prep();
    played = true;
});
track_control.onpointerdown = ()=> control_pressed = true;
track_control.onpointerup = ()=> control_pressed = false;

function loop() {
    requestAnimationFrame(loop);
    render();

    if (played) {
        track = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(track);
    }

    let impulse = Math.min(track ? track[2] : 0, track ? track[4] : 0);

    ctx.shadowBlur = 0;
    ctx.fillStyle = `hsl(${ 180 - (impulse / 255) * 180 }, 50%, 50%)`;
    
    radius = 80 + impulse / 10;

    for (let i = 0; i < 160 * 2; i ++) {
        ctx.save();
        ctx.translate(innerWidth / 2 + Math.sin(i * (Math.PI / 80)) * radius, innerHeight / 2 + Math.cos(i * (Math.PI / 80)) * radius);
        ctx.rotate(-i * Math.PI / 80);
        ctx.fillRect(0, 0, 1, 2 + (track ? track[i] : 0) * .5);
        ctx.restore();
    }

    ctx.shadowColor = `hsl(${ 180 - (impulse / 255) * 180 }, 50%, 50%)`;
    ctx.shadowBlur = 100;
    ctx.fillStyle = "#111";
    ctx.arc(innerWidth / 2, innerHeight / 2, radius, 0, Math.PI * 2); 
    ctx.fill();
    ctx.beginPath();

    if (!control_pressed)
        track_control.value = audio.currentTime / audio.duration * 100;

}