const { stackUnderflowError } = require('./errors');

class Stack {
    constructor() {
        this.stack = [];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    size() {
        return this.stack.length;
    }

    push(element) {
        this.stack.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            throw stackUnderflowError;
        }
        return this.stack.pop();
    }

    print() {
        let s = "";

        for (let i = 0; i < this.size(); i++) {
            s += `${i}: ${this.stack[i]}\n`;
        }

        return s;
    }
}

module.exports = Stack;