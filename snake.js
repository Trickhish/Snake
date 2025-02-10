var sx=9;
var sy=18;
var sd="up";
var mint=null;
var ntime = 200;
var fx=null;
var fy=null;
var sncells=[[9,18], [9,19], [9,20]];
var cells=[];

function rndPos() {
    // 324 : 18x18
    return(Math.floor(Math.random() * 324));
}

function die() {
    console.log("DEAD");

    document.querySelectorAll(".cell.snake").forEach((e)=>{
        e.classList.add("dead");
    });
}

function spawnFood() {
    var ind = rndPos();
    var fx = ind%18;
    var fy = Math.floor(ind/18);

    document.querySelectorAll(".cell.food").forEach((e)=>{
        e.classList.remove("food");
    });

    cells[ind].classList.add("food");
}

function move() {
    console.log("MOVE!");

    if (sd=="up") {
        sy--;
    } else if (sd=="down") {
        sy++;
    } else if (sd=="left") {
        sx--;
    } else { // right
        sx++;
    }
    if (sx<0 || sy<0 || sx>=18 || sy>=18) {
        die();
        return;
    }

    if (sx==fx && sy==fy) { // Found food

        spawnFood();
    }

    document.querySelectorAll(".cell.snake").forEach((e)=>{
        e.classList.remove("snake");
        e.classList.remove("head");
    });

    var ind = sy*18+sx;
    var cell = cells[ind];

    cell.classList.add("snake");
    cell.classList.add("head");

    for (let c of sncells) {
        let cx = c[0];
        let cy = c[1];

        let cind = cy*18;

        console.log(cx, cy, cind, cx*18, cind+cy);
        cells[cind].classList.add("snake");
    }

    mint = setTimeout(move, ntime);
}

function start() {
    console.log("Starting game");

    sx=9;
    sy=18;
    sd="up";
    cells=document.querySelectorAll(".cell");

    spawnFood();

    mint = setTimeout(move, ntime);
}

window.addEventListener("keydown", (ev)=>{
    if (ev.key=="ArrowUp") {
        sd="up";
    } else if (ev.key=="ArrowDown") {
        sd="down";
    } else if (ev.key=="ArrowLeft") {
        sd="left";
    } else if (ev.key=="ArrowRight") {
        sd="right";
    }
});

window.addEventListener("load", (ev)=>{

});