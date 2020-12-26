var board = Array(Array(0, 0, 0, 0, 0), Array(0, 0, 0, 0, 0), Array(0, 0, 0, 0, 0), Array(0, 0, 0, 0, 0), Array(0, 0, 0, 0, 0));
var X;
var Y;
var changed;
var time;

initBoard();

document.onkeydown = checkKey;
function checkKey(e) {
    if (e.ctrlKey) {
        switch (e.keyCode) {
            case 38:
                if (X > 0) {
                    if (board[X - 1][Y] == 0) {
                        board[X - 1][Y] = board[X][Y];
                        board[X][Y] = 0;
                        X = X - 1;
                        changed++;
                    }
                }                
                if(checkGameover()){
                    initBoard();
                }else {
                   draw();
                }
                break;
            case 40: if (X < 4) {
                if (board[X + 1][Y] == 0) {
                    board[X + 1][Y] = board[X][Y];
                    board[X][Y] = 0;
                    X = X + 1;
                    changed++;
                }
            }            
            if(checkGameover()){
                initBoard();
            }else {
               draw();
            }
                break;
            case 37: if (Y > 0) {
                if (board[X][Y - 1] == 0) {
                    board[X][Y - 1] = board[X][Y];
                    board[X][Y] = 0;
                    Y = Y - 1;
                    changed++;
                }
            } 
            if(checkGameover()){
                initBoard();
            }else {
               draw();
            } break;
            case 39: if (Y < 4) {
                if (board[X][Y + 1] == 0) {
                    board[X][Y + 1] = board[X][Y];
                    board[X][Y] = 0;
                    Y = Y + 1;
                    changed++;
                }
            } 
            if(checkGameover()){
                initBoard();
            }else {
               draw();
            } break;
        }
    } else {
        switch (e.keyCode) {
            case 38: if (X > 0) X = X - 1;
                draw(); break;
            case 40: if (X < 4) X = X + 1;
                draw(); break;
            case 37: if (Y > 0) Y = Y - 1;
                draw(); break;
            case 39: if (Y < 4) Y = Y + 1;
                draw(); break;
        }
    }
    //37 left, 39 right, 38 up, 40 down
}

function initBoard() {
    var numbers = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24);
    for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var k = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = k;
    }
    var k = 0;
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (!(i == 4 && j == 4)) {
                board[i][j] = numbers[k];
                k++;
            } else {
                board[i][j] = 0;
            }
        }
    }
    X = 4;
    Y = 4;
    changed = 0; 
    time = 300;
    draw();
    var timer = setInterval(function(){
        document.getElementById("timer").innerHTML = parseInt(time/60) + ":" + (time % 60);
        time --;    
        if(time < 0) {
            clearInterval(timer);
            alert("Time out!");
            initBoard();
        }
    }, 1000);
}

function draw() {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var cell = document.getElementById("board").rows[i].cells[j];
            if (board[i][j] == 0) {
                cell.innerHTML = "";
                cell.style.color = "#595959";
                cell.style.background = "#f2f2f2";
            } else {
                cell.innerHTML = board[i][j];
                cell.style.color = "#595959";
                cell.style.background = "#d9d9d9";
            }
            if (i == X && j == Y) {
                cell.style.color = "#ffffff";
                cell.style.background = "#737373";
            }
        }
    }
    document.getElementById("changed").innerHTML = changed;
}

function checkGameover() {
    if(board == Array(Array(1,2,3,4,5),Array(6,7,8,9,10),Array(11,12,13,14,15),Array(16,17,18,19,20),Array(21,22,23,24,0))){
        alert("Good job!");
        return true;
    }else{
        if(changed == 200) {
            alert("You've changed 200 times! Game over")
            return true;
        }else{
            return false;
        }
    }
}