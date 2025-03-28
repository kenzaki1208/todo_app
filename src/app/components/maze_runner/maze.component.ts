import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-maze',
    templateUrl: './maze.component.html',
    styleUrls: ['./maze.component.scss']
})
export class MazeComponent {
    maze: number[][] = [
        [0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
    ];
    playerPosition = { x: 0, y: 0};
    endPosition = { x: 4, y: 4 };
    gameWon = false;
    
    constructor() {
        this.startGame();
    }

    startGame() {
        this.playerPosition = { x: 0, y: 0};
        this.gameWon = false;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.gameWon) return;

        const {x, y} = this.playerPosition;
        let newX = x;
        let newY = y;

        switch (event.key) {
            case 'ArrowUp':
                newY = y - 1;
                break;
            case 'ArrowDown':
                newY = y + 1;
                break;
            case 'ArrowLeft':
                newX = x - 1;
                break;
            case 'ArrowRight':
                newX = x + 1;
                break;
            default:
                return;
        }

        if (
            newX >= 0 && newX < this.maze[0].length &&
            newY >= 0 && newY < this.maze.length && 
            this.maze[newY][newX] === 0
        ) {
            this.playerPosition = { x: newX, y: newY};
            this.checkWin();
        }
    }

    checkWin() {
        if (
            this.playerPosition.x === this.endPosition.x &&
            this.playerPosition.y === this.endPosition.y
        ) {
            this.gameWon = true;
        }
    }

    resetGame() {
        this.startGame();
    }
}