// TODO modify to group handlers by same fn parameters

function dogpileMitigationDecorator(fn) {
    const handlers = [];
    const isFirstInvocation = () => handlers.length === 1;
    const clearHandlers = () => handlers.splice(0, handlers.length);

    return (...args) =>
        new Promise(async (resolve, reject) => {
            handlers.push([resolve, reject]);

            if (isFirstInvocation()) {
                try {
                    const res = await fn(...args);
                    handlers.map(([doResolve]) => doResolve(res));
                } catch (err) {
                    handlers.map(([, doReject]) => doReject(err));
                }

                clearHandlers();
            }
        });
}

module.exports = dogpileMitigationDecorator;