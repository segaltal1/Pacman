'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
var SUPER_FOOD = '&#9898'
var CHERRY = '&#127826'

var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gFoodCounter = 1;

function init() {
    document.querySelector('h2 span').innerText = 0;
    gGame.score = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    setSuperFoodOnBoard();
    gCherryInterval = setInterval(setCherry, 10000);
    printMat(gBoard, '.board-container');
    gFoodCounter = countFoodOnBoard();
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}

function setSuperFoodOnBoard() {
    gBoard[1][1] = SUPER_FOOD;
    gBoard[1][gBoard.length - 2] = SUPER_FOOD;
    gBoard[gBoard.length - 2][gBoard.length - 2] = SUPER_FOOD;
    gBoard[gBoard.length - 2][1] = SUPER_FOOD;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;

}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval);
    if (gFoodCounter) openModal('Game Over');
    else openModal('Win')
    gFoodCounter = 0;
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    // TODO
}
function setCherry() {
    var idx = getRandomEmptyCell();
    if (idx != null) {
        gBoard[idx.i][idx.j] = CHERRY;
        renderCell(idx, CHERRY)
    }
}

function openModal(text) {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    // var text = gFoodCounter ? 'Game End' : 'Win';
    elModal.children[0].innerText = text;
}
function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
    init();

}
function countFoodOnBoard() {
    var counter = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === FOOD) counter++;
        }
    }
    return counter;
}
function getRandomEmptyCell() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            // console.log(gBoard[i][j]);
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i: i, j: j })
        }
    }
    if (emptyCells.length !== 0) {
        var index = getRandomIntInclusive(0, emptyCells.length)
        return emptyCells[index];
    }
    return null;

}