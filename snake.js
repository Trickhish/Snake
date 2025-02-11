var sx=9;
var sy=18;
var sd="up";
var esd="";
var mint=null;
var ntime = 200;
var fx=null;
var fy=null;
var sncells=[[9,18], [9,19], [9,20]];
var cells=[];
var started=false;

function rndPos() {
    // 324 : 18x18
    return(Math.floor(Math.random() * 324));
}

function die() {
    console.log("DEAD");

    document.querySelectorAll(".cell.snake").forEach((e)=>{
        e.classList.add("dead");
    });

    started=false;
}

async function pathFind(x,y,dx,dy) {
    var adx=0;
    if (dx>x) {
        adx=1;
    } else if (dx<x) {
        adx=-1;
    }

    var ady=0;
    if (dy>y) {
        ady=1;
    } else if (dy<y) {
        ady=-1;
    }

    for (var xi=x; xi!=dx; xi+=adx) {
        var ac = cells[y*18+xi];
        ac.classList.add("path");
    }
    for (var yi=y; yi!=dy; yi+=ady) {
        var ac = cells[yi*18+dx];
        ac.classList.add("path");
    }
}

function spawnFood() {
    var ind = rndPos();
    fx = ind%18;
    fy = Math.floor(ind/18);

    document.querySelectorAll(".cell.food").forEach((e)=>{
        e.classList.remove("food");
    });

    pathFind(sx,sy,fx,fy);

    cells[ind].classList.add("food");
}

function isBitingTail(x, y) {
    for (snc of sncells) {
        if (snc[0]==x && snc[1]==y) {
            return(true);
        }
    }
    return(false);
}

function move() {
    //console.log("MOVE!");
    //console.log(sncells.join(', '));

    var adx=0;
    var ady=0;

    esd=sd;
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

    if (sx<0 || sy<0 || sx>=18 || sy>=18 || isBitingTail(sx, sy)) {
        die();
        return;
    }

    var foundFood=false;
    if (sx==fx && sy==fy) { // Found food
        foundFood=true;
        ntime=Math.max(0, ntime-5);

        document.querySelectorAll(".cell.path").forEach((e)=>{
            e.classList.remove("path");
        });

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

    started=true;

    document.querySelectorAll(".cell.snake").forEach((e)=>{
        e.classList.remove("dead");
        e.classList.remove("head");
        e.classList.remove("snake");
    });

    ntime = 200;

    sx=9;
    sy=18;
    sd="up";
    sncells=[[9,18], [9,19], [9,20]];

    cells=document.querySelectorAll(".cell");

    spawnFood();

    mint = setTimeout(move, ntime);
}

window.addEventListener("keydown", (ev)=>{
    if (ev.key=="ArrowUp" && esd!="down") {
        sd="up";
        if (started) {
            if (esd!="up") {
                clearTimeout(mint);
                move();
            }
        } else {
            start();
        } 
    } else if (ev.key=="ArrowDown" && esd!="up") {
        sd="down";
        if (started) {
            if (esd!="down") {
                clearTimeout(mint);
                move();
            }
        } else {
            start();
        } 
    } else if (ev.key=="ArrowLeft" && esd!="right") {
        sd="left";
        if (started) {
            if (esd!="left") {
                clearTimeout(mint);
                move();
            }
        } else {
            start();
        }  
    } else if (ev.key=="ArrowRight" && esd!="left") {
        sd="right";
        if (started) {
            if (esd!="right") {
                clearTimeout(mint);
                move();
            }
        } else {
            start();
        }  
    }
});

window.addEventListener("load", (ev)=>{

});