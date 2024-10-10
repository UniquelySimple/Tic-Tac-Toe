for (let index = 1; index < 10; index++) {
    //creating divs dynamically
    //<div class="box b1" id="b1"><span id="b1text"></span></div>
    var div = document.createElement('div');
    div.setAttribute('class','box b'+index);
    div.setAttribute('id','b'+index);
    var span = document.createElement('span');
    span.setAttribute('id','b'+index+'text');
    div.appendChild(span);
    document.getElementById('main').appendChild(div);
}
for (let index = 1; index < 10; index++){
    document.getElementById('b'+index).addEventListener('click', function () {clickDiv('b'+index+'text','b'+index,index)});
}
var turn = turns = gameOver = 0;
var moves = [];
let turnCount = [];
let xIn = [0,0,0,0,0,0,0,0,0];
let xMoves = [];
let yIn = [0,0,0,0,0,0,0,0,0];
let yMoves = [];
function clickDiv(id,bid,index) {
    if (gameOver != 0) {
        return;
    }
    setInnerHtml(id,index);
    checkWinner(xIn,'x');
    checkWinner(yIn,'o');
    playerTurn();
    if (turnCount.includes(''+index+'') === false) {
        turns+=1;
        if (turns > 1) {
            showMoves(turns,id);
        }
        turnCount.push(''+index+'');
    }
    document.getElementById(''+bid).classList.add('pointer-change');
}
function setInnerHtml(id,index){
    if (moves.includes(''+id+'') === false) {
        if (turn === 0) {
            document.getElementById(''+id+'').innerHTML = "X";
            turn = 1;
            xIn.splice(index-1,1,'x');
            if (xMoves.includes(index-1) === false) {
                xMoves.push(index-1);   
            }
        } else {
            document.getElementById(''+id+'').innerHTML = "0";
            turn = 0;
            yIn.splice(index-1,1,'o');
            if (yMoves.includes(index-1) === false) {
                yMoves.push(index-1);   
            }
        }
        moves.push(''+id+'');
    }
}
function playerTurn() {
    if (turn === 0) {
        document.getElementById('player').innerHTML = "X";
    } else {
        document.getElementById('player').innerHTML = "O";
    }
}
function showMoves(turns,id){
    var temp = turns-1;
    //creating moves count h3 dynamically
    //<h3 class="move" id="1">go to move 1</h3>
    var move = document.createElement('h3');
    move.setAttribute('class','move');
    move.setAttribute('id',''+temp+'');
    move.innerHTML = 'go to move '+temp;
    document.getElementById('plays').appendChild(move);
    document.getElementById(''+temp+'').addEventListener('click', function () {moveBack(temp)});
}
function checkWinner(arr,val) {
    let counter = 0;
    // horizontal checking
    for (let i = 0; i < arr.length; i+=3) {
        for (let j = i; j < i+3; j++) {
            if (arr[j] === val){
                counter++;
            }
            else{
                break;
            }
            if (counter === 3){
                gameOver = 1;
                gameEnd(val);
            }
        }
        counter = 0;
    }
    // vertical checking
    for (let i = 0; i < 4; i++) {
        for (let j = i; j < arr.length; j+=3){
            if (arr[j] === val){
                counter++;
            }
            else{
                break;
            }
            if (counter === 3){
                gameOver = 1;
                gameEnd(val);
            }
        }
        counter = 0;        
    }
    // diagonal checking 1-5-9
    if (arr[0] === val && arr [4] === val && arr[8] === val) {
        gameOver = 1;  
        gameEnd(val);      
    }
    // diagonal checking 3-5-7
    if (arr[2] === val && arr [4] === val && arr[6] === val) {
        gameOver = 1;  
        gameEnd(val);      
    }
}
function gameEnd(val){
    document.getElementById('ss').innerHTML = val.toUpperCase()+' won the game';
    let returns = document.getElementsByClassName('move');
    for (let i = 0; i < returns.length; i++) {
        returns[i].classList.add('pointer-change');
    }
    returns = document.getElementsByClassName('box');
    for (let i = 0; i < returns.length; i++) {
        returns[i].classList.add('pointer-change');
    }
}
function moveBack(val){
    if (gameOver != 0) {
        return;
    }
    turn = val;
    for (let index = moves.length; index > val; index--) {
        let id = moves[index-1];
        moves.pop();
        document.getElementById(id).innerHTML = '';
        yIn.splice(index,1,0);
    }
    while (xMoves.length >= val) {
        if (xMoves.length === 1) {
            break;
        }
        xIn.splice(xMoves[xMoves.length-1],1,0);
        xMoves.pop();
    }
    while (yMoves.length >= val) {
        yIn.splice(yMoves[yMoves.length-1],1,0);
        yMoves.pop();
    }
    while (turns>val) {
        let toRemove = turns-1;
        console.log('toRemove : '+toRemove);
        document.getElementById(''+toRemove+'').remove();
        turns--;
    } 
}