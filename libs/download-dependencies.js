/**
 * 下载依赖
 * 目标路径、模板数据、命令行回显
 */
function downloadDependencies({ destPath, templatesData, spinner }) {
    const join = require('path').join
    const { child } = require('./child-process.js')
    const installCmd = {
        'Use YARN': 'yarn install',
        'Use CNPM': 'cnpm install',
        'Use NPM': 'npm install'
    }
    spinner.text = 'download dependencies'
    spinner.color = 'red'

    return new Promise((resolve) => {
        const end = () => {
            spinner.stop()
            resolve()
        }

        if (templatesData.npm) {
            const cb = (content) => {
                spinner.text = 'download dependencies ' + content
            }

            child({ cmd: installCmd[templatesData.mode], cwd: join(destPath, templatesData.appName), cb, end })
        } else {
            end()
        }
    })
}

module.exports = { downloadDependencies }
