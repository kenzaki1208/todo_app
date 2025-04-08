import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-snake-game',
    templateUrl: './snake_game.component.html',
    styleUrls: ['./snake_game.component.scss']
})
export class SnakeGameComponent implements OnInit {
    gridSize = 10;
    snake: {x: number, y: number} [] = [{x: 5, y: 5}];
    food: {x: number, y: number} = {x: 0, y: 0};
    diretion: string = 'right';
    nextDiretion: string = 'right';
    gameOver: boolean = false;
    gameInterval: any;
    
    ngOnInit() {
        this.generateFood();
        this.startGame();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                if (this.diretion !== 'down') this.nextDiretion = 'up';
                break;
            case 'ArrowDown':
                if (this.diretion !== 'up') this.nextDiretion = 'down';
                break;
            case 'ArrowLeft':
                if (this.diretion !== 'right') this.nextDiretion = 'left';
                break;
            case 'ArrowRight':
                if (this.diretion !== 'left') this.nextDiretion = 'right';
                break;
        }
    }

    startGame() {
        this.gameInterval = setInterval(() => {
            this.moveSnake();
        },200);
    }

    moveSnake() {
        if (this.gameOver) return;

        this.diretion = this.nextDiretion;

        const head = {...this.snake[0]};

        switch (this.diretion) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
            this.gameOver = true;
            clearInterval(this.gameInterval);
            return;
        }

        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver = true;
                clearInterval(this.gameInterval);
                return;
            }
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize)
        };

        for (let segment of this.snake) {
            if (this.food.x === segment.x && this.food.y === segment.y) {
                this.generateFood();
            }
        }
    }

    resetGame() {
        this.snake = [{x: 5, y: 5}];
        this.diretion = 'right';
        this.gameOver = false;
        this.generateFood();
        clearInterval(this.gameInterval);
        this.startGame();
    }

    get gridRows(): number[] {
        return Array(this.gridSize).fill(0).map((_, i) => i);
    }

    get gridCols(): number[] {
        return Array(this.gridSize).fill(0).map((_, i) => i);
    }

    isSnake(x: number, y: number): boolean {
        return this.snake.some(segment => segment.x === x && segment.y === y);
    }

    isFood(x: number, y: number): boolean {
        return this.food.x === x && this.food.y === y;
    }
}