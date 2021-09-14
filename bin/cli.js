#!/usr/bin/env node

const ora = require('ora')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const join = require('path').join
const { readdirSync, writeFileSync } = require('../libs/readdir-sync.js')
const { processArray } = require('../libs/async-map.js')

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'create a app',
            default: 'my-vue-app'
        }
    ])
    .then((anwsers) => {
        const spinner = ora({
            text: 'download files',
            spinner: {
                interval: 80,
                frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
            }
        }).start()

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

                        writeFileSync(join(destDir, file), content)

                        resolve()
                    }, 200)
                })
            })
        })

        processArray(asyncArray).then((res) => {
            setTimeout(() => {
                spinner.stop()
            }, 1000)
        })
    })
