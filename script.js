(function() {
    'use strict';

    const tiles = document.querySelectorAll('.square');

    const gameMap = {
        "x-1-1": [0,0],
        "x-1-2": [0,200],
        "x-1-3": [0,400],
        "x-1-4": [0,600],
        "x-2-1": [200,0],
        "x-2-2": [200,200],
        "x-2-3": [200,400],
        "x-2-4": [200,600],
        "x-3-1": [400,0],
        "x-3-2": [400,200],
        "x-3-3": [400,400],
        "x-3-4": [400,600],
        "x-4-1": [600,0],
        "x-4-2": [600,200],
        "x-4-3": [600,400],
        "x-4-4": [600,600],
    }

    tiles.forEach(function(selectedTile) {
        selectedTile.addEventListener('click', function() {
            // code for each tile here.
            console.log("tile clicked = ", selectedTile.id);

            const emptyTile = document.querySelector('.empty');
   
            swap(selectedTile, emptyTile);
        });
    });

    function swap(selectedTile, emptyTile) {
        let emptyTileStyles = window.getComputedStyle(emptyTile);
        let emptyTop = emptyTileStyles.getPropertyValue('top').slice(0, -2);
        let emptyLeft = emptyTileStyles.getPropertyValue('left').slice(0, -2);

        // console.log("top = ", parseInt(emptyTop));
        // console.log("left = ", parseInt(emptyLeft)); 

        let tileStyles = window.getComputedStyle(selectedTile);

        let selectedTop = tileStyles.getPropertyValue('top').slice(0, -2);
        let selectedLeft = tileStyles.getPropertyValue('left').slice(0, -2);

        // console.log("top selected = ", parseInt(selectedTop));
        // console.log("left selected = ", parseInt(selectedLeft));

        if (Math.abs(parseInt(emptyTop) - parseInt(selectedTop)) === 200 && parseInt(emptyLeft) === parseInt(selectedLeft)) {
            // selected tile is swappable
            // swap it
            let temp = selectedTop + 'px';
            selectedTile.style.top = emptyTop + 'px';
            emptyTile.style.top = temp;

            gameWon(tiles); // check if game is won each time you swap 

        } else if (Math.abs(parseInt(emptyLeft) - parseInt(selectedLeft)) === 200 && parseInt(emptyTop) === parseInt(selectedTop)) {
            let temp = selectedLeft + 'px';
            selectedTile.style.left = emptyLeft + 'px';
            emptyTile.style.left = temp;

            gameWon(tiles); // check if game is won each time you swap
        }
    }

    function gameWon(tiles) {
        let win = true;

        for (let tile of tiles) {
            let tileStyles = window.getComputedStyle(tile);
            let selectedTop = parseInt(tileStyles.getPropertyValue('top').slice(0, -2));
            let selectedLeft = parseInt(tileStyles.getPropertyValue('left').slice(0, -2));

            console.log("seleected top = ", selectedTop);
            console.log("selected left = ", selectedLeft);

            console.log("game map 0 = ", gameMap[tile.id][0]);
            console.log("game map 1 = ", gameMap[tile.id][1]);

            if (!(gameMap[tile.id][0] === selectedTop && gameMap[tile.id][1] === selectedLeft)) {
                win = false; // this tile is in the right place
                console.log("breaking");
                break;
            }
        }

        if (win) {
            console.log("Game won!");
        } else {
            console.log("Sorry you lost.");
        }
    }
})();