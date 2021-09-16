/**
 * 异步循环
 */
function processArray(asyncArray) {
    return new Promise((resolve) => {
        async function splice() {
            const res = asyncArray.splice(0, 1)
            if (res.length) {
                await res[0]()
                splice()
            } else {
                resolve()
            }
        }
        splice()
    })
}

/**
 * 延迟执行的 promise函数
 */
function delayPromise(fn, time, ...arg) {
    return () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                fn(resolve, ...arg)
            }, time)
        })
    }
}

module.exports = { processArray, delayPromise }
