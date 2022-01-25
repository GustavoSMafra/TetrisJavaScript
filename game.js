const canvas = document.getElementById("canvas");
const canvasBlock = document.getElementById("canvasBlock");
const canvasScore = document.getElementById("canvasScore");
const canvasContext = canvas.getContext('2d');
const canvasContextBlock = canvasBlock.getContext('2d');
const canvasContextScore = canvasScore.getContext('2d');
canvasContext.scale(20,20)
canvasContextBlock.scale(20,20)
canvasContextScore.scale(10,10)

window.onload = () => {
    update()
}

// Update and fall time
let lastTime = 0;
let dropCounter = 0;
let dropInterval = 500 // 0.5 Segundo
let gameTime = 0;
let speedChange = 10000;
function update(time = 0){
    if(endGame == 0){
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        gameTime += deltaTime;

        if(dropCounter > dropInterval){
            player.fall();
            dropCounter = 0;
        }

        if(gameTime > speedChange && dropInterval > 120){
            dropInterval -= 10;
            gameTime = 0;
        }

        draw();
        requestAnimationFrame(update);
    }
}

function draw(){
    // Draw black screen
    createRect(0, 0, canvas.width, canvas.height, "black");
    // Draw black screen Block and Block
    canvasContextBlock.fillStyle = 'black'
    canvasContextBlock.fillRect(0, 0, canvasBlock.width, canvasBlock.height)
    
    canvasContextScore.fillStyle = 'black'
    canvasContextScore.fillRect(0, 0, canvasScore.width, canvasScore.height)
    canvasContextScore.font = "2px Arial"
    canvasContextScore.fillStyle = "#00FF42"
    canvasContextScore.fillText(`Score: ${score}` , 0, 2)
    
    if(player.storeBlock > 0){
        let block = returnBlock(player.storeBlock-1)
        block[0].forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0) {
                    canvasContextBlock.fillStyle = collors[player.storeBlock-1]
                    canvasContextBlock.fillRect(x+2 , y+1, 1, 1);
                }
            });
        });
    }
    // Blocks
    drawBlock(player.block, player.pos, player.collor, player.rotate);
    // Arena
    drawArena(arena);
}

// Function to draw blocks
function drawBlock(block, moviment, collor, rotate){
    block[rotate].forEach((row,y) => {
        row.forEach((value,x) => {
            if(value !== 0) {
                createRect(x + moviment.x , y + moviment.y, 1, 1, collor);
            }
        });
    });
}

// Function to draw the arena
function drawArena(arena){
    arena.forEach((row,y) => {
        row.forEach((value,x) => {
            if(value !=0) {
                createRect(x, y, 1, 1, collors[value-1]);
            }
        });
    });
}

// Function to draw things :)
function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

// Create the matrix for the arena
function createArena(h, w){
    const matrix = [];
    while(h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// Player Block
const player = {
    block: returnBlock(0),
    collor: collors[0],
    pos: {x: 8, y: 0},
    rotate: 0,
    canStore: 0,
    storeBlock: 0,
    fall(){
        this.pos.y++;
        if(collision(player, arena)){
            let rand = Math.floor(Math.random() * (7));
            this.pos.y--;
            merge(player, arena);
            completeLine(arena);
            if(endGame == 0){
                this.block = returnBlock(rand);
                this.collor = collors[rand];
                this.pos.y = 0;
                this.pos.x = 8;
                this.canStore = 0;
                this.rotate = 0;
            }
        }
    },
    moviment(type){
        if(type == 'a'){
            this.pos.x--
            if(collisionMove(player, arena)){
                this.pos.x++;
            }
        }
        else if(type == 'd'){
            this.pos.x++
            if(collisionMove(player, arena)){
                this.pos.x--;
            }
        }
    },
    setRotate(){
        if(this.rotate > 0){
            this.rotate--;
            if(collision(this, arena))
                this.rotate++;
        }else 
            this.rotate = 3
            if(collision(this, arena))
                this.rotate = 0;
    },
    store(){
        if(this.canStore < 2){
            if(this.storeBlock == 0){
                this.storeBlock = collors.indexOf(player.collor)+1
                let rand = Math.floor(Math.random() * (7));
                this.block = returnBlock(rand);
                this.collor = collors[rand];
                this.pos.y = 0;
                this.pos.x = 8;
            } else {
                let temp = this.storeBlock 
                this.storeBlock = collors.indexOf(player.collor)+1
                this.block = returnBlock(temp-1);
                this.collor = collors[temp-1];
                this.pos.y = 0;
                this.pos.x = 8;
            }
            this.canStore++;
        }
    }
}

// Merge player with arena
function merge(player, arena){
    for(let y = 0; y < player.block[player.rotate].length; y++){
        for(let x = 0; x < player.block[player.rotate][y].length; x++){
            if(player.block[player.rotate][y][x] == 1){
                arena[y+player.pos.y][x+player.pos.x] = collors.indexOf(player.collor)+1;
            }
        }
    }
}

// Collision between blocks and arena (and with another blocks)
function collision(player, arena){
    for(let y = 0; y < player.block[player.rotate].length; y++){
        for(let x = 0; x < player.block[player.rotate][y].length; x++){
            if(player.block[player.rotate][y][x] == 1){
                if((y + player.pos.y) > arena.length-1){
                    return true;
                }
                else if (arena[y+player.pos.y][x+player.pos.x] != 0){
                    if((y + player.pos.y) <= 4){
                        endGame = 1;
                    }
                    return true;
                }
            }
        }
    }
    return false;
}

// Collisiona for moviments
function collisionMove(player, arena){
    for(let y = 0; y < player.block[player.rotate].length; y++){
        for(let x = 0; x < player.block[player.rotate][y].length; x++){
            if(player.block[player.rotate][y][x] == 1){
                if((x + player.pos.x) > arena[y].length-1){
                    return true;
                }
                else if((x + player.pos.x) < 0){
                    return true;
                }
                else if (arena[y+player.pos.y][x+player.pos.x] != 0){
                    return true;
                }
            }
        }
    }
    return false;
}

// Function to detect when the line is complete
function completeLine(arena){
    let cond = 1;
    for(let y = 0; y < arena.length; y++){
        for(let x = 0; x < arena[y].length; x++){
            if(arena[y][x] == 0)
                cond = 0;
        }
        if(cond == 1){
            // Score points, that need to be improve
            score ++
            for(let y2 = y; y2 > 0; y2--){
                for(let x2 = 0; x2 < arena[y].length; x2++){
                    arena[y2][x2] = arena[y2-1][x2];
                }
            }
            y--;
        } 
        cond = 1;
    } 
}

// Key event controller
window.addEventListener("keydown", (event) =>{
    setTimeout(()=>{
        if(event.keyCode == 37){
            player.moviment("a")
        }
        else if(event.keyCode == 39){
            player.moviment("d")
        }
        else if(event.keyCode == 38){
            player.setRotate()
        }
        else if(event.keyCode == 40){
            player.fall()
        }
        else if(event.keyCode == 17){
            player.store()
        }
    }, 1)
})

// Create arena, score and start the game
let arena = createArena(30,15);
let score = 0;
let endGame = 0;
update();