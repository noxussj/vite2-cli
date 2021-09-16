#!/usr/bin/env node

const inquirer = require('inquirer')
const join = require('path').join
const { spinner } = require('../libs/ora.js')
const { downloadTemplates } = require('../libs/download-templates.js')
const { downloadDependencies } = require('../libs/download-dependencies.js')

/**
 * 问题集合
 */
const questions = [
    {
        type: 'input',
        name: 'appName',
        message: 'Create a app',
        default: 'my-vue-app'
    },
    {
        type: 'confirm',
        name: 'npm',
        message: 'Is install node_modules?',
        default: false
    },
    {
        type: 'list',
        name: 'mode',
        message: 'Please select the way you download',
        when(answers) {
            return answers.npm
        },
        choices: ['Use YARN', 'Use CNPM', 'Use NPM']
    }
]

/**
 * 询问完毕
 */
inquirer.prompt(questions).then(async (answers) => {
    spinner.start()

    const sourcePath = join(__dirname, '../', 'templates/demo')
    const destPath = process.cwd()
    const templatesData = answers
    const templatesFiles = ['package.json', 'index.html']

    await downloadTemplates({ sourcePath, destPath, templatesData, templatesFiles, spinner }) // 下载模板
    await downloadDependencies({ destPath, templatesData, spinner }) // 下载依赖
})
