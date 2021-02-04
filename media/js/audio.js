export let context, analyser, src;
export const
    audio = document.querySelector("audio"),
    input = document.querySelector("input[type=file]");

input.onchange = e=> {

    audio.src = URL.createObjectURL(e.target.files[0]);
    
}

export function prep() {
    context = new AudioContext,
    analyser = context.createAnalyser(),
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
}