const evaluate = (expression) => {
    const tokens = [...expression];

    const values = [];
    const operators = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === ' ') {
            continue;
        }

        if (isNumber(tokens[i])) {
            let num = '';
            while (i < tokens.length && isNumber(tokens[i])) {
                num += tokens[i++];
            }
            values.push(parseInt(num));
            i--;
        } else if (isOperator(tokens[i])) {
            while (operators.length > 0 && hasPriority(tokens[i])) {
                const result = applyOperation(operators.pop(), values.pop(), values.pop());
                values.push(result);
            }
            operators.push(tokens[i]);
        }
    }

    while (operators.length > 0) {
        const result = applyOperation(operators.pop(), values.pop(), values.pop());
        values.push(result);
    }

    return values.pop();
};

const isNumber = (token) => {
    return token >= '0' && token <= '9';
};

const isOperator = (token) => {
    return ['+','-','*','/'].includes(token);
};

const hasPriority = (op) => {
    if (['*','/'].includes(op)) {
        return false;
    }
    return true;
};

const applyOperation = (op, num1, num2) => {
    switch (op) {
        case '+':
            return num2 + num1;
        case '-':
            return num2 - num1;
        case '*':
            return num2 * num1;
        case '/':
            return num2 / num1;
        default:
            throw new Error('invalid op: ' + op);
    }
}

module.exports = {
    evaluate,
};