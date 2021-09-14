#!/usr/bin/env node

const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
const join = require('path').join
const { readdirSync, writeFileSync } = require('./libs/readdir-sync.js')

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
        const tmpDir = join(__dirname, 'templates/demo')
        const destDir = process.cwd()
        const filesPath = readdirSync(tmpDir)

        filesPath.forEach((file) => {
            const hbsList = ['package.json']
            let content = fs.readFileSync(join(tmpDir, file), 'utf-8')

            hbsList.map((fileName) => {
                if (file.indexOf(fileName) > -1) {
                    const template = handlebars.compile(content)
                    content = template(anwsers)
                }
            })

            writeFileSync(join(destDir, file), content)
        })
    })
