const { GPU } = require('gpu.js');
const canv = document.getElementById("screen");
const ctx = canv.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const HALFW = WIDTH/2
const HALFH = HEIGHT/2
canv.width = WIDTH
canv.height = HEIGHT
console.log(WIDTH, HEIGHT)

function toOriginX(x) {
    return x - HALFW
}

function toOriginY(y) {
    return y - HALFH
}

function toScreenX(x) {
    return x + HALFW
}

function toScreenY(y) {
    return HALFH - y
}

function toScreen(coords) {
    return [toScreenX(coords[0]),toScreenY(coords[1])]
}

function fillTri(a,b,c) {
    a = toScreen(a)
    b = toScreen(b)
    c = toScreen(c)

    ctx.beginPath();
    ctx.moveTo(a[0],a[1])
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.lineTo(a[0],a[1]);
    ctx.closePath();
    ctx.fill()

}

fillTri([0,0],[0,55],[55,0])