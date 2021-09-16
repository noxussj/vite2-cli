#!/usr/bin/env node

const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const join = require('path').join
const { readdirSync, writeFileSync } = require('../libs/readdir-sync.js')
const { processArray } = require('../libs/async-map.js')
const { spinner } = require('../libs/ora.js')
const { child } = require('../libs/child-process.js')

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

inquirer.prompt(questions).then((anwsers) => {
    spinner.start()

    const tmpDir = join(__dirname, '../', 'templates/demo')
    const destDir = process.cwd()
    const filesPath = readdirSync(tmpDir)
    const hbsList = ['package.json', 'index.html']

    const asyncArray = []

    filesPath.forEach((file) => {
        asyncArray.push(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    spinner.text = 'download ' + file

                    let content = fs.readFileSync(join(tmpDir, file), 'utf-8')

                    hbsList.map((fileName) => {
                        if (file.indexOf(fileName) > -1) {
                            const template = handlebars.compile(content)
                            content = template(anwsers)
                        }
                    })

                    writeFileSync(join(destDir, anwsers.appName, file), content)

                    resolve()
                }, 50)
            })
        })
    })

    /**
     * 初始化目录后执行，安装依赖
     */
    processArray(asyncArray).then((res) => {
        spinner.text = 'download dependencies'
        spinner.color = 'red'

        if (anwsers.npm) {
            const installCmd = {
                'Use YARN': 'yarn install',
                'Use CNPM': 'cnpm install',
                'Use NPM': 'npm install'
            }

            const cb = (content) => {
                spinner.text = 'download dependencies ' + content
            }

            const end = (error) => {
                setTimeout(() => {
                    spinner.stop()

                    setTimeout(() => {
                        if (error) console.error(error)
                    }, 200)
                }, 1000)
            }

            child({ cmd: installCmd[anwsers.mode], cwd: join(destDir, anwsers.appName), cb, end })
        } else {
            spinner.stop()
        }
    })
})
