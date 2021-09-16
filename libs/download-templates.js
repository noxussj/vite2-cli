/**
 * 下载模板
 * 源路径、目标路径、模板数据、模板文件、命令行回显
 */
function downloadTemplates({ sourcePath, destPath, templatesData, templatesFiles, spinner }) {
    const { readdirSync, writeFileSync } = require('./readdir-sync.js')
    const { processArray, delayPromise } = require('./async-map.js')
    const join = require('path').join
    const fs = require('fs')
    const handlebars = require('handlebars')
    const templateFiles = readdirSync(sourcePath)

    const fn = (resolve, file) => {
        spinner.text = 'download templates ' + file
        let content = fs.readFileSync(join(sourcePath, file), 'utf-8')

        templatesFiles.map((fileName) => {
            if (file.indexOf(fileName) > -1) content = handlebars.compile(content)(templatesData)
        })

        writeFileSync(join(destPath, templatesData.appName, file), content)
        resolve()
    }

    const asyncArray = templateFiles.map((file) => delayPromise(fn, 50, file))
    return processArray(asyncArray)
}

module.exports = { downloadTemplates }
