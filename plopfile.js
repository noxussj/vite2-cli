/**
 * generator生成器
 */
module.exports = (plop) => {
    const del = require('del')

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
        actions: [
            {
                type: 'add',
                path: `plop-dist/index.vue`,
                templateFile: 'plop-templates/index.vue',
                data: {}
            }
        ]
    })
}
