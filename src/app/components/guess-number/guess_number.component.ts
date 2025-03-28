import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-guess-number',
    templateUrl: './guess_number.component.html',
    styleUrls: ['./guess_number.component.scss']
})
export class GuessNumberComponent implements OnInit {
    targetNumber: number = 0;
    userGuess: number | null = null;
    message: string = 'Hãy đoán số từ 1 đến 100';
    attemps: number = 0;
    isGameOver: boolean = false;

    ngOnInit(): void {
        this.resetGame();    
    }

    resetGame() {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.userGuess = null;
        this.message = 'Hãy đoán 1 số từ 1 đến 100!';
        this.attemps = 0;
        this.isGameOver = false;
    }

    guessNumber() {
        if (this.userGuess === null || this.userGuess < 1 || this.userGuess > 100) {
            this.message = 'Vui lòng nhập số từ 1 đến 100 !';
            return; 
        }

        this.attemps++;

        if (this.userGuess === this.targetNumber) {
            this.isGameOver = true;
            this.message = `Chúc mừng! Bạn đã đoán trúng số ${this.targetNumber} sau ${this.attemps} lần thử !`;
        } else if (this.userGuess > this.targetNumber) {
            this.message = 'Số bạn đoán lớn hơn ! Thử lại nhé.'
        } else {
            this.message = 'Số bạn đoán nhỏ hơn ! Thử lại nhé.'
        }
    }
}