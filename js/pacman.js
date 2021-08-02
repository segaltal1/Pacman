'use strict'
const PACMAN = `<img src="img/pacmen.png" style="width:20px"/>`;

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isSuper: false,
        direction: 'left'
    }
    board[gPacman.location.i][gPacman.location.j] = getPacmenHtml();
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    // console.log('gPacman.location', gPacman.location);
    var nextLocation = getNextLocation(ev);
    if (!nextLocation) return
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === SUPER_FOOD && gPacman.isSuper) return;
    //If Step on SUper food
    if (nextCell === SUPER_FOOD) {
        setColorGhosts();
        gPacman.isSuper = true;
        //setting back is super after 5 seconds
        setTimeout(function () { gPacman.isSuper = false }, 5000);
    }
    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST || !gFoodCounter) {
        if (gPacman.isSuper) {
            // debugger
            removeGhost(nextLocation)
        }
        else {

            gameOver();
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1);
        //update the  food
        gFoodCounter--;
    }
    if (nextCell === CHERRY) {
        updateScore(10);
        //update the  food
        gFoodCounter--;
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    // debugger
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, getPacmenHtml());
    // if (nextLocation.key === 'ArrowUp') renderPacmen(`rotate(-90deg`);
    // if (nextLocation.key === 'ArrowDown') renderPacmen(`rotate(90deg`);
    // if (nextLocation.key === 'ArrowRight') renderPacmen(0);
    // if (nextLocation.key === 'ArrowLeft') renderPacmen(`rotateY(-180deg`);
    console.log(gPacman.direction);

}


function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard', eventKeyboard)

    // renderCell(gPacman.location, PACMAN);
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    // figure out nextLocation
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.direction = 'up'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.direction = 'down'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.direction = 'right'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.direction = 'left'
            break;

        default: return null
    }
    return nextLocation;
}


function getPacmenHtml() {
    return `<span class="pacmen ${gPacman.direction}">${PACMAN}</span>`
}
