const fs = require('fs')
const join = require('path').join

/**
 * 获取指定目录所有文件
 */
function readdirSync(basePath) {
    const filesPath = []

    function savePath(path) {
        const files = fs.readdirSync(path)

        files.map((name) => {
            if (fs.statSync(join(path, name)).isDirectory()) {
                savePath(join(path, name))
            } else {
                filesPath.push(join(path, name).replace(basePath, ''))
            }
        })
    }

    savePath(basePath)

    return filesPath
}

/**
 * 创建目录，最后一层为文件
 */
function mkdirSync(filePath) {
    const arr = filePath.split('\\')
    let basePath = ''

    for (const index in arr) {
        const path = arr[index]
        basePath = basePath ? join(basePath, path) : path

        if (!fs.existsSync(basePath) && index < arr.length - 1) {
            fs.mkdirSync(basePath)
        }
    }
}

/**
 * 写入文件
 */
function writeFileSync(filePath, content) {
    if (!fs.existsSync(filePath)) mkdirSync(filePath)

    fs.writeFileSync(filePath, content)
}

module.exports = { readdirSync, writeFileSync }
