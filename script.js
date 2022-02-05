(function() {
    'use strict';

    const tiles = document.querySelectorAll('.square');
    const overlay = document.querySelector('.overlay');
    const gameOverMessage = document.querySelector('.game-over-message');
    const scrambleBtn = document.getElementById('scramble');
    const solveBtn = document.getElementById('solve');

    let positions = [0, 150, 300, 450];
    let tileWidth = positions[1];
    
    const gameMap = {
        "x-1-1": [0,0],
        "x-1-2": [0, positions[1]],
        "x-1-3": [0, positions[2]],
        "x-1-4": [0, positions[3]],
        "x-2-1": [positions[1], 0],
        "x-2-2": [positions[1], positions[1]],
        "x-2-3": [positions[1], positions[2]],
        "x-2-4": [positions[1], positions[3]],
        "x-3-1": [positions[2], 0],
        "x-3-2": [positions[2], positions[1]],
        "x-3-3": [positions[2], positions[2]],
        "x-3-4": [positions[2], positions[3]],
        "x-4-1": [positions[3], 0],
        "x-4-2": [positions[3], positions[1]],
        "x-4-3": [positions[3], positions[2]],
        "x-4-4": [positions[3], positions[3]],
    }

    scramble();

    scrambleBtn.addEventListener('click', scramble);
    solveBtn.addEventListener('click', solve);

    function scramble() {
        // Scramble the array of positions
        let currentIndex = positions.length;
        let randomIndex = 0;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [positions[currentIndex], positions[randomIndex]] = [positions[randomIndex], positions[currentIndex]];
        }

        // Display the scrambled tiles
        let i = 0, j = 0;
        for (let k = 0; k < tiles.length; k++) {
            tiles[k].style.top = positions[i] + 'px';
            tiles[k].style.left = positions[j] + 'px';
            i++;

            if (i === 4) {
                i = 0;
            }
            if ((k + 1) % 4 === 0) {
                j++;
            }
        }
    }

    function solve() {
        for (let tile of tiles) {
            tile.style.top = gameMap[tile.id][0] + 'px';
            tile.style.left = gameMap[tile.id][1] + 'px';
        }
    }

    tiles.forEach(function(selectedTile) {
        // Handle click of any tile
        selectedTile.addEventListener('click', function() {
            const emptyTile = document.querySelector('.empty');
   
            swap(selectedTile, emptyTile);
        });
    });

    function swap(selectedTile, emptyTile) {
        let emptyTileStyles = window.getComputedStyle(emptyTile);
        let emptyTop = emptyTileStyles.getPropertyValue('top').slice(0, -2);
        let emptyLeft = emptyTileStyles.getPropertyValue('left').slice(0, -2);

        let tileStyles = window.getComputedStyle(selectedTile);
        let selectedTop = tileStyles.getPropertyValue('top').slice(0, -2);
        let selectedLeft = tileStyles.getPropertyValue('left').slice(0, -2);

        if (Math.abs(parseInt(emptyTop) - parseInt(selectedTop)) === tileWidth && parseInt(emptyLeft) === parseInt(selectedLeft)) {
            // selected tile is swappable
            // swap it
            let temp = selectedTop + 'px';
            selectedTile.style.top = emptyTop + 'px';
            emptyTile.style.top = temp;

            selectedTile.ontransitionend = function() {
                gameWon();
            }

        } else if (Math.abs(parseInt(emptyLeft) - parseInt(selectedLeft)) === tileWidth && parseInt(emptyTop) === parseInt(selectedTop)) {
            let temp = selectedLeft + 'px';
            selectedTile.style.left = emptyLeft + 'px';
            emptyTile.style.left = temp;

            selectedTile.ontransitionend = function() {
                gameWon();
            }
        }
    }

    function gameWon() {
        let win = true;

        for (let tile of tiles) {
            let tileStyles = window.getComputedStyle(tile);
            let selectedTop = parseInt(tileStyles.getPropertyValue('top').slice(0, -2));
            let selectedLeft = parseInt(tileStyles.getPropertyValue('left').slice(0, -2));

            if (!(gameMap[tile.id][0] === selectedTop && gameMap[tile.id][1] === selectedLeft)) {
                win = false; // this tile is in the wrong place
                break;
            }
        }

        if (win) {
            overlay.classList.remove('hide');
            gameOverMessage.textContent = 'You win!';

            setTimeout(() => {
                overlay.classList.add('hide');
            }, 1500);
        }
    }
})();