import * as m3d from "./3dshit.js"
import Input from "./input.js";

const gpu = new GPU.GPU();
const input = new Input()




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
const FOV = 120
const TORAD = Math.PI/180
let toProject = [[0,0,35],[0,35,35],[35,0,35]]
let camPos = [0,0,0]
let camRotation = [0,0,0]
let lastTime = Date.now()/1000
let dt = 0
let SPEED = 15





function main() {
    dt = (Date.now()/1000) - lastTime
    lastTime = Date.now()/1000
    let heldVec = [((+ input.d) - (+ input.a)), ((+ input.e) - (+ input.q)), ((+ input.w) - (+ input.s))]
    if (heldVec[0] + heldVec[1] + heldVec[2] != 0) {
        heldVec = m3d.normalize(heldVec)
        heldVec = m3d.multVect(heldVec,dt*SPEED)
        console.log(m3d.addVects(camPos,heldVec))
        camPos = m3d.addVects(camPos,heldVec)
    } 
    // camPos[0] += ((+ input.d) - (+ input.a)) * dt * SPEED
    // camPos[1] += ((+ input.e) - (+ input.q)) * dt * SPEED
    // camPos[2] += ((+ input.w) - (+ input.s)) * dt * SPEED
    camRotation[0] += ((+ input.ArrowUp) - (+ input.ArrowDown)) * dt * SPEED * TORAD
    camRotation[1] += ((+ input.ArrowRight) - (+ input.ArrowLeft)) * dt * SPEED * TORAD

    const camMatrix = m3d.genRotationMatrix(camRotation)
    //console.log(m3d.genRotationMatrix(camRotation))

    let toDraw = [...toProject]
    for (let i = 0; i < toProject.length; i++) {
        toDraw[i] = [toDraw[i][0] - camPos[0],toDraw[i][1] - camPos[1],toDraw[i][2] - camPos[2]]
        toDraw[i] = m3d.rotate(toDraw[i],camPos,camMatrix)
        // toDraw[i][1] -= camPos[1]
        // toDraw[i][2] -= camPos[2]
    }
    //console.log(toDraw, toDraw[0])
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,WIDTH,HEIGHT)
    ctx.fillStyle = "black"
    fillTri(m3d.project(toDraw[0],FOV),m3d.project(toDraw[1],FOV),m3d.project(toDraw[2],FOV))

    ctx.font = `${HEIGHT*0.045}px Comic Sans MS`
    printLines(["Cam pos: " + camPos.join(", "), "Cam rotation" + camRotation.join(", "), "DT: " + dt.toFixed(2),"FPS: " + (1/dt).toFixed(2), "Rot matrix " + camMatrix.join(" ")],0,HEIGHT*0.95,HEIGHT*0.045)
    //console.log(toProject[0])
}

setInterval(main,15)