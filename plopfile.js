/**
 * generator生成器
 */
module.exports = (plop) => {
    const del = require('del')
    const readdirSync = require('./libs/readdir-sync.js')

    del('dist')

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
            const filesPath = readdirSync('plop-templates/demo/')
            const map = {
                'package.hbs': 'package.json'
            }
            const mapKeys = Object.keys(map)
            const mapValues = Object.values(map)

            filesPath.map((path) => {
                let mapPath = path
                mapKeys.map((key, index) => {
                    if (mapPath.indexOf(key) > -1) {
                        mapPath = mapPath.replace(key, mapValues[index])
                    }
                })

                actions.push({
                    type: 'add',
                    path: `dist/${mapPath}`,
                    templateFile: `plop-templates/demo/${path}`,
                    data: {}
                })
            })

            return actions
        }
    })
}
