#!/usr/bin/env node

const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const join = require('path').join
const { readdirSync, writeFileSync } = require('../libs/readdir-sync.js')
const { processArray, delayPromise } = require('../libs/async-map.js')
const { spinner } = require('../libs/ora.js')
const { child } = require('../libs/child-process.js')

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
inquirer.prompt(questions).then(async (anwsers) => {
    spinner.start()

    await downloadTemplates({ anwsers })
    await downloadDependencies({ anwsers })
})

/**
 * 下载模板
 */
function downloadTemplates({ anwsers }) {
    const tmpDir = join(__dirname, '../', 'templates/demo')
    const destDir = process.cwd()
    const templateFiles = readdirSync(tmpDir)
    const hbsList = ['package.json', 'index.html']

    const fn = (resolve, file) => {
        spinner.text = 'download templates ' + file
        let content = fs.readFileSync(join(tmpDir, file), 'utf-8')

        hbsList.map((fileName) => {
            if (file.indexOf(fileName) > -1) content = handlebars.compile(content)(anwsers)
        })

        writeFileSync(join(destDir, anwsers.appName, file), content)
        resolve()
    }

    const asyncArray = templateFiles.map((file) => delayPromise(fn, 50, file))
    return processArray(asyncArray)
}

/**
 * 下载依赖
 */
function downloadDependencies({ anwsers }) {
    const destDir = process.cwd()
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

        if (anwsers.npm) {
            const cb = (content) => {
                spinner.text = 'download dependencies ' + content
            }

            child({ cmd: installCmd[anwsers.mode], cwd: join(destDir, anwsers.appName), cb, end })
        } else {
            end()
        }
    })
}
