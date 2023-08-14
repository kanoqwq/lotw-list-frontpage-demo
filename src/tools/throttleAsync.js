export function throttleAsync(fn) {
    let isPending = false;
    return function (...args) {
        if (isPending) return new Promise(() => { });
        isPending = true;
        return fn
            .call(this, ...args)
            .then((...args1) => {
                isPending = false;
                return Promise.resolve(...args1);
            })
            .catch((...args2) => {
                isPending = false;
                return Promise.reject(...args2);
            });
    };
}
