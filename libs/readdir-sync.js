/**
 * 获取指定目录所有文件
 */
function readdirSync(basePath) {
    const resolve = require('path').resolve
    const fs = require('fs')
    const filesPath = []

    function savePath(path) {
        const files = fs.readdirSync(path)

        files.map((name) => {
            if (fs.statSync(resolve(path, name)).isDirectory()) {
                savePath(`${path + name}/`)
            } else {
                filesPath.push(`${path + name}`.replace(basePath, ''))
            }
        })
    }

    savePath(basePath)

    return filesPath
}

module.exports = readdirSync
