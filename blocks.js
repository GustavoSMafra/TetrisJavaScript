function returnBlock(type){
    switch(type){
        case 00:
            return block1;
            break;
        
        case 01:
            return block2;
            break;
        case 02:
            return block3;
            break;

        case 03:
            return block4;
            break;

        case 04:
            return block5;
            break;

        case 05:
            return block6;
            break;

        case 06:
            return block7;
            break;
    }
}

const collors = [
    ['purple'],
    ['red'],
    ['yellow'],
    ['orange'],
    ['blue'],
    ['green'],
    ['pink'],
]

const block1 = [
    // Block 1
    [ 
        [0,0,0],
        [0,1,0],
        [1,1,1]],
    [
        [0,0,1],
        [0,1,1],
        [0,0,1]],

    [
        [1,1,1],
        [0,1,0],
        [0,0,0]],

    [
        [1,0,0],
        [1,1,0],
        [1,0,0]],
]

const block2 = [
    // Block 2
    [ 
        [0,1,0],
        [1,1,0],
        [1,0,0]],
    [ 
        [0,0,0],
        [1,1,0],
        [0,1,1]],
    [ 
        [0,0,1],
        [0,1,1],
        [0,1,0]],
    [ 
        [1,1,0],
        [0,1,1],
        [0,0,0]],    
]

const block3 = [
    // Block 3
    [ 
        [0,0,0],
        [1,1,0],
        [1,1,0]],
    [ 
        [0,0,0],
        [1,1,0],
        [1,1,0]],
    [ 
        [0,0,0],
        [1,1,0],
        [1,1,0]],
    [ 
        [0,0,0],
        [1,1,0],
        [1,1,0]],
]

const block4 = [
    // Block 4
    [ 
        [0,0,0],
        [0,0,1],
        [1,1,1]],
    [ 
        [0,1,1],
        [0,0,1],
        [0,0,1]],
    [ 
        [1,1,1],
        [1,0,0],
        [0,0,0]],
    [ 
        [1,0,0],
        [1,0,0],
        [1,1,0]],
]

const block5 = [
    // Block 5
    [ 
        [0,0,0],
        [1,0,0],
        [1,1,1]],
    [ 
        [0,0,1],
        [0,0,1],
        [0,1,1]],
    [ 
        [1,1,1],
        [0,0,1],
        [0,0,0]],
    [ 
        [1,1,0],
        [1,0,0],
        [1,0,0]],
]

const block6 = [
    // Block 6
    [ 
        [0,1,0],
        [0,1,1],
        [0,0,1]],
    [ 
        [0,1,1],
        [1,1,0],
        [0,0,0]],
    [ 
        [1,0,0],
        [1,1,0],
        [0,1,0]],
    [ 
        [0,0,0],
        [0,1,1],
        [1,1,0]],
]

const block7 = [
    // Block 7
    [ 
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]],
    [ 
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]],
    [ 
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]],
    [ 
        [0,0,0,0],
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0]],
]