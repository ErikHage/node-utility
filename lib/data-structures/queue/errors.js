const queueUnderflowError = new Error();
queueUnderflowError.code = "QUEUE_UNDERFLOW_ERROR";

module.exports = {
    queueUnderflowError,
};