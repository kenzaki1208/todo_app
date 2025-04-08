import { Component } from '@angular/core';

@Component({
    selector: 'app-caro-chess',
    templateUrl: './caro_chess.component.html',
    styleUrls: ['./caro_chess.component.scss']
})
export class CaroChessComponent {
    board: string[] = Array(9).fill('');
    currentPlayer: string = 'X';
    winner: string | null = null;
    isGameOver: boolean = false;

    private winCombinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];       

    makeMove(index: number): void {
        if (!this.board[index] && !this.isGameOver) {
            this.board[index] = this.currentPlayer;
            this.checkWinner();
            if (!this.isGameOver) {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    checkWinner(): void {
        for (let combination of this.winCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                this.isGameOver = true;
                return;
            }
        }

        if (!this.board.includes('')) {
            this.isGameOver = true;
            this.winner = 'Hòa'
        }
    }

    resetGame():void {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.winner = null;
        this.isGameOver = false;
    }
}