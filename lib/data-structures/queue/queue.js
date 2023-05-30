const { queueUnderflowError } = require('./errors');

class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
        this.numOfItems = 0;
    }

    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
        this.numOfItems++;
        return true;
    }

    dequeue() {
        if (this.frontIndex === this.backIndex) {
            throw queueUnderflowError;
        }

        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        this.numOfItems--;
        return item;
    }

    peek() {
        return this.items[this.frontIndex] || null;
    }

    size() {
        return this.numOfItems;
    }

    isEmpty() {
        return this.numOfItems === 0;
    }

    print() {
        let s = "";

        for (let i = this.frontIndex; i < this.backIndex; i++) {
            s += `${i}: ${this.items[i]}\n`;
        }

        return s;
    }
}

module.exports = Queue;