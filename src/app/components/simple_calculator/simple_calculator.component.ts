import { Component } from '@angular/core';

@Component({
    selector: 'app-simple-calculator',
    templateUrl: './simple_calculator.component.html',
    styleUrls: ['./simple_calculator.component.scss']
})
export class SimpleCalculatorComponent {
    result: string = '';

    appendToResult(value: string) {
        this.result += value;
    }

    calculate() {
        try {
            this.result = eval(this.result);
        } catch (error) {
            this.result = 'Lỗi';
        }
    }

    clear() {
        this.result = '';
    }
}