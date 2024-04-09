import * as m3d from "./3dshit.js"
import Input from "./input.js";

const gpu = new GPU.GPU();
const input = new Input()




const canv = document.getElementById("screen");
const ctx = canv.getContext("2d");

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
    //console.log(m3d.genRotationMatrix(camRotation))

    let toDraw = [...toProject]
    for (let i = 0; i < toProject.length; i++) {
        //toDraw[i] = [toDraw[i][0] - camPos[0],toDraw[i][1] - camPos[1],toDraw[i][2] - camPos[2]]
        toDraw[i] = m3d.rotate(toDraw[i],camPos,camMatrix)
        // toDraw[i][1] -= camPos[1]
        // toDraw[i][2] -= camPos[2]
    }
    //console.log(toDraw)
    
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,WIDTH,HEIGHT)
    ctx.fillStyle = "black"
    let projected = []
    for (let i = 0; i < toDraw.length; i += 3) {
        projected.push([m3d.project(toDraw[i],FOV),m3d.project(toDraw[i+1],FOV),m3d.project(toDraw[i+2],FOV)])
    }
    fillTri(projected[0][0],projected[0][1],projected[0][2])
    //m3d.drawTri(projected[0][0],projected[0][1],projected[0][2],[0,0,0])
    //console.log(m3d.drawTri(projected[0][0],projected[0][1],projected[0][2],[0,0,0]))
    // fillTri(m3d.project(toDraw[0],FOV),m3d.project(toDraw[1],FOV),m3d.project(toDraw[2],FOV))
    //fillTri(m3d.project(m3d.rotate([-25,0,45],camPos,camMatrix),FOV),m3d.project(m3d.rotate([0,25,45],camPos,camMatrix),FOV),m3d.project(m3d.rotate([25,0,45],camPos,camMatrix),FOV))
    //fillTri([-25,0],[0,25],[200,0])
    //console.log(m3d.project(toDraw[1],FOV))
    //console.log(toDraw)
    //console.log(/*toDraw[1][0]*camMatrix[0]+toDraw[1][1]*camMatrix[1]+toDraw[1][2]*camMatrix[2],toDraw[1][0]*camMatrix[3],*/toDraw[1][1]*camMatrix[4]/*,toDraw[1][2]*camMatrix[5]*/)

    ctx.font = `${HEIGHT*0.045}px Comic Sans MS`
    printLines([`Cam pos: ${camPos[0].toFixed(2)}, ${camPos[1].toFixed(2)}, ${camPos[2].toFixed(2)}`, `Cam rotation ${camRotation[0].toFixed(2)}, ${camRotation[1].toFixed(2)}, ${camRotation[2].toFixed(2)}`, "DT: " + dt.toFixed(2),"FPS: " + (1/dt).toFixed(2)],0,HEIGHT*0.95,HEIGHT*0.045)
    //console.log(toProject[0])
}

setInterval(main,15)