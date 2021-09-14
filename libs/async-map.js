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

module.exports = { processArray }
