/**
 * generator生成器
 */
module.exports = (plop) => {
    const del = require('del')
    const resolve = require('path').resolve
    const fs = require('fs')

    del('plop-dist')

    plop.setGenerator('component', {
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'create a project',
                default: 'my-vue-app'
            }
        ],
        actions: () => {
            const actions = []
            const filesPath = getFiles('plop-templates/demo/')

            filesPath.map((path) => {
                console.log(path)
                actions.push({
                    type: 'add',
                    path: `dist/${path}`,
                    templateFile: `plop-templates/demo/${path}`,
                    data: {}
                })
            })

            return actions
        }
    })

    /**
     * 获取指定目录所有文件
     */
    function getFiles(basePath) {
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
}
