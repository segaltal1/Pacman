'use strict'
const GHOST = '&#9781;';
var gGhostsColors = [];
var gGhosts;
var gIntervalGhosts;

function createGhost(board) {

    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),

    }
    gGhosts.push(ghost);
    gGhostsColors.push(ghost.color);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell);
    // return if cannot move

    if (nextCell === WALL || nextCell === SUPER_FOOD) return
    if (nextCell === GHOST) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver();
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    // update the model
    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}

function setColorGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        console.log('i', i);
        gGhostsColors.push(gGhosts[i].color);
        gGhosts[i].color = '#ff7f50';
    }
    setTimeout(setColorBack, 3000);

}

function setColorBack() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = gGhostsColors.pop();
    }
}

function removeGhost(cell) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === cell.i && gGhosts[i].location.j === cell.j) {
            gGhosts.splice(i, 1);
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}