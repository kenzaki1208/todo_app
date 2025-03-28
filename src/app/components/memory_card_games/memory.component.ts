import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'app-memory-card-game',
    templateUrl: './memory.component.html',
    styleUrls: ['./memory.component.scss']
})
export class MemoryComponent {
    cards: {id: number; value: number; flipped: boolean; matched: boolean} [] = [];
    flippedCards: number[] = [];
    moves = 0;
    gameWon = false;

    constructor(private cdr: ChangeDetectorRef) {
        this.startGame();
    }

    startGame() {
        this.moves = 0;
        this.gameWon = false;
        this.flippedCards = [];

        const values = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        
        this.cards = values
            .sort(() => Math.random() - 0.5)
            .map((value, index) => ({
                id: index,
                value: value,
                flipped: false,
                matched: false,
            }));
    }

    flipCard(cardId: number) {
        const card = this.cards.find((c) => c.id === cardId);
        if ( !card || card.matched || card.flipped || this.flippedCards.length >= 2) {
            return;
        }

        card.flipped = true;
        this.flippedCards.push(cardId);
        this.moves++;

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [firstCardId, secondCardId] = this.flippedCards;
        const firstCard = this.cards.find((c) => c.id === firstCardId);
        const secondCard = this.cards.find((c) => c.id === secondCardId);

        if (firstCard!.value === secondCard!.value) {
            firstCard!.matched = true;
            secondCard!.matched = true;
            this.flippedCards = [];
            this.checkWin();
        } else {
            setTimeout(() => {
                firstCard!.flipped = false;
                secondCard!.flipped = false;
                this.flippedCards = [];
                this.cdr.detectChanges();
            }, 1000);
        }
    }

    checkWin() {
        if (this.cards.every((card) => card.matched)) {
            this.gameWon = true;
        }
    }

    resetGame() {
        this.startGame();
    }
}