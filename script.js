"use strict";

const currentValueText = document.querySelector(".current-value");
const preventValueText = document.querySelector(".previous-value");
const numbersButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const clearCurrentButton = document.querySelector("[data-clear-current]");
const clearButton = document.querySelector("[data-clear]");
const deleteLastNumberButton = document.querySelector("[data-delete]");
const dotButton = document.querySelector("[data-dot]");
const equalButton = document.querySelector("[data-equal]");
const changeButton = document.querySelector("[data-change]");

class Calculator {
    constructor(currentValueTextElement, previousValueTextElement) {
        this.currentValueTextElement = currentValueTextElement;
        this.previousValueTextElement = previousValueTextElement;
        this.clear();
    }

    dot() {
        if (this.currentValue == "") this.currentValue = "0.";
        if (this.currentValue.includes(".")) return;
        this.currentValue = this.currentValue + ".";
    }

    addNumber(number) {
        if (number == 0 && this.currentValue[0] == 0) return;

        this.currentValue = this.currentValue.toString() + number.toString();
    }

    clearCurrentValue() {
        this.currentValue = "";
    }

    chooseOperation(operator) {
        if (this.currentValue == "") return;
        if (this.previousValue !== "") this.equal();
        this.operation = operator;
        this.previousValue = `${this.currentValue.toString()} ${operator}`;
        this.currentValue = "";
    }

    equal() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;
        console.log(this.operation);
        switch (this.operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "/":
                result = prev / current;
                break;
            case "X":
                result = prev * current;
                break;
            default:
                break;
        }
        this.currentValue = result.toString();
        this.previousValue = "";
        this.operation = null;
    }

    removeLastNumber() {
        this.currentValue = this.currentValue.slice(0, -1);
    }

    change() {
        this.currentValue = (+this.currentValue * -1).toString();
    }

    clear() {
        this.currentValue = "";
        this.previousValue = "";
        this.operation = null;
    }

    display() {
        this.currentValueTextElement.innerText = this.currentValue;
        this.previousValueTextElement.innerText = this.previousValue;
    }
}

const calculator = new Calculator(currentValueText, preventValueText);

numbersButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.display();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button);
        calculator.chooseOperation(button.innerText);
        calculator.display();
    });
});

dotButton.addEventListener("click", () => {
    calculator.dot();
    calculator.display();
});

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.display();
});

clearCurrentButton.addEventListener("click", () => {
    calculator.clearCurrentValue();
    calculator.display();
});

deleteLastNumberButton.addEventListener("click", () => {
    calculator.removeLastNumber();
    calculator.display();
});

changeButton.addEventListener("click", () => {
    calculator.change();
    calculator.display();
});

equalButton.addEventListener("click", () => {
    calculator.equal();
    calculator.display();
});
