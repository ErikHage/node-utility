const stackUnderflowError = new Error();
stackUnderflowError.code = "STACK_UNDERFLOW_ERROR";

module.exports = {
    stackUnderflowError,
};