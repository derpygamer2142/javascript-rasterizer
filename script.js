import * as m3d from "./3dshit.js"
import Input from "./input.js";
let canv = document.getElementById("screen");
let ctx = canv.getContext("2d");

const gpu = new GPU.GPU({
    canvas: canv
});
const input = new Input()






const CALCWIDTH = 1920
const CALCHEIGHT = 1080
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const HALFW = WIDTH/2
const HALFH = HEIGHT/2
canv.width = WIDTH
canv.height = HEIGHT
console.log(WIDTH, HEIGHT)

function toOriginX(x) {
    return ((x - HALFW)/CALCWIDTH) * WIDTH
}

function toOriginY(y) {
    return ((y - HALFH)/CALCHEIGHT) * HEIGHT
}

function toScreenX(x) {
    return ((x/WIDTH)*CALCWIDTH) + HALFW
}

function toScreenY(y) {
    return HALFH - ((y/HEIGHT)*CALCHEIGHT)
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

function printLines(text,x,y,size) {
    text.reverse()
    ctx.font = `${size}px Comic Sans MS`
    ctx.fillStyle = "black"
    for (let i = 0;i < text.length; i++) {
        ctx.fillText(text[i],x,y-(i*(size*1.03)))
    }
}




//let coords = m3d.project([0,35,35],120)


// initial values and stuff
const FOV = 300
const TORAD = Math.PI/180
let toProject = [[-25,0,45],[1,50,45],[25,0,45]]
let camPos = [0,0,0]
let camRotation = [0,0,0]
let lastTime = Date.now()/1000
let dt = 0
let SPEED = 15





function main() {
    dt = (Date.now()/1000) - lastTime
    lastTime = Date.now()/1000
    let heldVec = [((+ input.a) - (+ input.d)), ((+ input.q) - (+ input.e)), ((+ input.s) - (+ input.w))]
    if ((Math.abs(heldVec[0]) + Math.abs(heldVec[1]) + Math.abs(heldVec[2])) != 0) {
        heldVec = m3d.normalize(heldVec)
        heldVec = m3d.multVect(heldVec,dt*SPEED)
        //console.log(m3d.addVects(camPos,heldVec))
        camPos = [camPos[0]+heldVec[0],camPos[1]+heldVec[1],camPos[2]+heldVec[2]]
    } 
    
    // camPos[0] += ((+ input.d) - (+ input.a)) * dt * SPEED
    // camPos[1] += ((+ input.e) - (+ input.q)) * dt * SPEED
    // camPos[2] += ((+ input.w) - (+ input.s)) * dt * SPEED
    camRotation[0] -= ((+ input.ArrowRight) - (+ input.ArrowLeft)) * dt * SPEED*2 * TORAD // left/right
    camRotation[1] += ((+ input.ArrowUp) - (+ input.ArrowDown)) * dt * SPEED*2 * TORAD // up/down
    camRotation[2] += ((+ input.m) - (+ input.n)) * dt * SPEED*2 * TORAD // roll
    

    const camMatrix = m3d.genRotationMatrix(camRotation)
    const camVec = m3d.rotate([0,0,1],[0,0,0],camMatrix)
    //console.log(m3d.genRotationMatrix(camRotation))

    let toDraw = [...toProject]
    for (let i = 0; i < toProject.length; i++) {
        let rotated = Array.from(m3d.rotate(toDraw[i],camPos,camMatrix))
        toDraw[i] = rotated.concat(Array.from(m3d.project(rotated,FOV)))
        
        
    }
    m3d.genDepthBuffer(toDraw,WIDTH,HEIGHT,true)
    
    printLines([`Cam pos: ${camPos[0].toFixed(2)}, ${camPos[1].toFixed(2)}, ${camPos[2].toFixed(2)}`, `Cam rotation ${camRotation[0].toFixed(2)}, ${camRotation[1].toFixed(2)}, ${camRotation[2].toFixed(2)}`, "DT: " + dt.toFixed(2),"FPS: " + (1/dt).toFixed(2)],0,HEIGHT*0.95,HEIGHT*0.045)

}

setInterval(main,15)