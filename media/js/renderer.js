export const
    cvs = document.querySelector("canvas"),
    ctx = cvs.getContext("2d");
cvs.width = innerWidth;
cvs.height = innerHeight;

export function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}