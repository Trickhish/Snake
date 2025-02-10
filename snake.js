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
    fx = ind%18;
    fy = Math.floor(ind/18);

    document.querySelectorAll(".cell.food").forEach((e)=>{
        e.classList.remove("food");
    });

    cells[ind].classList.add("food");
}

function move() {
    //console.log("MOVE!");
    //console.log(sncells.join(', '));

    var adx=0;
    var ady=0;

    if (sd=="up") {
        ady=-1;
    } else if (sd=="down") {
        ady=1;
    } else if (sd=="left") {
        adx=-1;
    } else { // right
        adx=1;
    }

    sx+=adx;
    sy+=ady;

    if (sx<0 || sy<0 || sx>=18 || sy>=18) {
        die();
        return;
    }

    var foundFood=false;
    if (sx==fx && sy==fy) { // Found food
        foundFood=true;
        ntime=Math.max(0, ntime-5);
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

    //sncells[0][0]+=adx;
    //sncells[0][1]+=ady;
    sncells.splice(0, 0, [sx, sy]);

    /*var i=0;
    while (var i<sncells.length-1) {
        sncells.splice(0, 0, [sncells[i][0]+adx, sncells[i][1]+ady]);
        i++;
    }
    for (var i=0; i<sncells.length-1; i++) {

    }*/
    if (!foundFood) {
        sncells.pop();
    }

    for (let c of sncells) {
        let cx = c[0];
        let cy = c[1];

        let cind = cy*18+cx;
        if (cind<324) {
            cells[cind].classList.add("snake");
        }
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